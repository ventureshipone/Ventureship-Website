import axios from 'axios';
import * as cheerio from 'cheerio';
import { supabase } from '../lib/supabase';

// Function to extract meta description and other relevant content from a URL
export async function extractMetaDescription(url: string): Promise<string | null> {
  try {
    // Ensure URL has protocol
    const formattedUrl = url.startsWith('http') ? url : `https://${url}`;
    
    console.log(`Attempting to fetch content from: ${formattedUrl}`);
    
    // Fetch the HTML content with extended timeout and proper headers
    const response = await axios.get(formattedUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache'
      },
      timeout: 15000, // 15 second timeout
      maxRedirects: 5
    });
    
    // Check if we got a valid response
    if (!response.data) {
      console.log('No data received from URL');
      return null;
    }
    
    console.log(`Successfully fetched content from: ${formattedUrl}`);
    
    // Parse the HTML
    const $ = cheerio.load(response.data);
    
    // Extract company name from the URL to help with relevance filtering
    const domainName = new URL(formattedUrl).hostname
      .replace('www.', '')
      .split('.')
      .slice(0, -1)
      .join('.');
    
    console.log(`Domain name extracted: ${domainName}`);
    
    // First, try to find hero section content
    const heroContent = extractHeroContent($);
    if (heroContent) {
      console.log('Found hero section content');
      return heroContent;
    }
    
    // Collection of potential descriptions
    const candidates: {text: string, score: number}[] = [];
    
    // 1. Try meta tags (highest priority)
    const metaDescription = $('meta[name="description"]').attr('content');
    const ogDescription = $('meta[property="og:description"]').attr('content');
    const twitterDescription = $('meta[name="twitter:description"]').attr('content');
    
    if (metaDescription && metaDescription.length > 30) {
      candidates.push({text: metaDescription, score: 100});
      console.log('Found meta description tag');
    }
    
    if (ogDescription && ogDescription.length > 30) {
      candidates.push({text: ogDescription, score: 95});
      console.log('Found og:description tag');
    }
    
    if (twitterDescription && twitterDescription.length > 30) {
      candidates.push({text: twitterDescription, score: 90});
      console.log('Found twitter:description tag');
    }
    
    // 2. Look for "about us" sections (very relevant)
    $('div, section').each((i, el) => {
      const id = $(el).attr('id') || '';
      const className = $(el).attr('class') || '';
      const text = $(el).text().trim();
      
      // Skip if text is too short or too long
      if (text.length < 50 || text.length > 1000) return;
      
      // Check if this looks like an "about" section
      const isAboutSection = 
        id.toLowerCase().includes('about') || 
        className.toLowerCase().includes('about') ||
        $(el).find('h1, h2, h3, h4, h5, h6').text().toLowerCase().includes('about');
      
      if (isAboutSection) {
        // Extract a reasonable chunk of text
        const cleanText = text
          .replace(/\s+/g, ' ')
          .substring(0, 300);
        
        candidates.push({text: cleanText, score: 85});
        console.log('Found about section');
      }
    });
    
    // 3. Look for hero/banner sections (often contain company descriptions)
    $('header, .hero, .banner, [class*="hero"], [class*="banner"], [class*="jumbotron"]').each((i, el) => {
      const text = $(el).text().trim();
      
      // Skip navigation menus and very short texts
      if (text.length < 40 || text.length > 500) return;
      
      // Check if it contains typical navigation items
      const navigationTerms = ['home', 'products', 'services', 'contact', 'about', 'login', 'sign up', 'cart'];
      const wordsInText = text.toLowerCase().split(/\s+/);
      const navigationTermCount = navigationTerms.filter(term => 
        wordsInText.includes(term)
      ).length;
      
      // Skip if it looks like a navigation menu
      if (navigationTermCount > 2) return;
      
      const cleanText = text
        .replace(/\s+/g, ' ')
        .substring(0, 300);
      
      candidates.push({text: cleanText, score: 80});
      console.log('Found hero/banner section');
    });
    
    // 4. Look for paragraphs near the top of the page
    let paragraphCount = 0;
    $('p').each((i, el) => {
      if (paragraphCount > 5) return; // Only check first few paragraphs
      
      const text = $(el).text().trim();
      if (text.length < 40 || text.length > 500) return;
      
      // Skip paragraphs that look like navigation, copyright, etc.
      if (text.includes('©') || text.includes('copyright') || 
          text.includes('all rights reserved') || text.includes('privacy policy')) {
        return;
      }
      
      // Higher score for earlier paragraphs
      const score = 75 - (paragraphCount * 5);
      
      candidates.push({text: text, score});
      paragraphCount++;
      console.log(`Found paragraph ${paragraphCount}`);
    });
    
    // 5. Look for company description in structured data
    const structuredData = $('script[type="application/ld+json"]');
    structuredData.each((i, el) => {
      try {
        const data = JSON.parse($(el).html() || '{}');
        let description = null;
        
        // Check for organization description
        if (data['@type'] === 'Organization' && data.description) {
          description = data.description;
        } 
        // Check for nested organization
        else if (data['@graph']) {
          const org = data['@graph'].find((item: any) => 
            item['@type'] === 'Organization' || item['@type'] === 'Corporation'
          );
          if (org && org.description) {
            description = org.description;
          }
        }
        
        if (description && description.length > 30) {
          candidates.push({text: description, score: 90});
          console.log('Found structured data description');
        }
      } catch (e) {
        // Ignore JSON parse errors
      }
    });
    
    // If we have candidates, sort by score and return the best one
    if (candidates.length > 0) {
      // Sort by score (highest first)
      candidates.sort((a, b) => b.score - a.score);
      
      // Get the highest scoring candidate
      let bestDescription = candidates[0].text;
      
      // Clean up the description
      bestDescription = bestDescription
        .replace(/\s+/g, ' ')
        .trim();
      
      // Truncate if too long
      if (bestDescription.length > 250) {
        bestDescription = bestDescription.substring(0, 247) + '...';
      }
      
      console.log(`Selected best description with score ${candidates[0].score}`);
      return bestDescription;
    }
    
    // If we still don't have a good description, try a last resort approach
    // Look for any substantial text block
    let lastResortText = '';
    $('div, section').each((i, el) => {
      if (lastResortText) return;
      
      const text = $(el).text().trim();
      if (text.length > 100 && text.length < 500) {
        lastResortText = text
          .replace(/\s+/g, ' ')
          .trim()
          .substring(0, 250);
        
        if (lastResortText.length === 250) {
          lastResortText += '...';
        }
      }
    });
    
    if (lastResortText) {
      console.log('Using last resort text block');
      return lastResortText;
    }
    
    console.log('No suitable description found');
    return null;
  } catch (error: any) {
    console.error(`Error extracting meta description from ${url}:`, error.message || error);
    
    // Try to provide more specific error information
    if (error.code === 'ECONNABORTED') {
      console.error('Request timed out');
    } else if (error.response) {
      console.error(`Status code: ${error.response.status}`);
    }
    
    return null;
  }
}

// Function to extract hero content from HTML
function extractHeroContent($: cheerio.CheerioAPI): string | null {
  // Look for hero section text content
  const heroSelectors = [
    'section.hero p', 
    '.hero-content p',
    'section.hero .text-xl',
    '.hero-section p',
    'header p.text-xl',
    'section.relative p.text-xl',
    'section.relative p.mb-8',
    '.hero p.mb-8',
    'section p.mb-8.text-xl'
  ];
  
  for (const selector of heroSelectors) {
    const heroText = $(selector).first().text().trim();
    if (heroText && heroText.length > 40) {
      // Clean up and return the hero text
      return heroText
        .replace(/\s+/g, ' ')
        .trim()
        .substring(0, 250);
    }
  }
  
  return null;
}

// Function to get the hero description from our own website
export async function getVentureshipHeroDescription(): Promise<string> {
  // Default hero description in case we can't extract it from the DOM
  const defaultDescription = "A global powerhouse with a $1.8 Trillion verified valuation, pioneering solutions across Digital Transformation, E-Commerce, Software, and beyond.";
  
  try {
    // In a real application, we would fetch this from the actual page
    // Since we're in the same app, we can return the known text directly
    return defaultDescription;
  } catch (error) {
    console.error('Error getting hero description:', error);
    return defaultDescription;
  }
}

// Function to update company meta description in the database
export async function updateCompanyMetaDescription(companyId: string, metaDescription: string): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('companies')
      .update({ meta_description: metaDescription })
      .eq('id', companyId);
    
    if (error) throw error;
    
    return true;
  } catch (error) {
    console.error('Error updating company meta description:', error);
    return false;
  }
}

// Function to fetch and update meta descriptions for all companies
export async function fetchAndUpdateAllMetaDescriptions(): Promise<void> {
  try {
    // Get all companies without meta descriptions
    const { data: companies, error } = await supabase
      .from('companies')
      .select('id, website_url, meta_description, name')
      .is('meta_description', null);
    
    if (error) throw error;
    
    if (!companies || companies.length === 0) {
      console.log('No companies found without meta descriptions');
      return;
    }
    
    // Get the hero description from our own website
    const heroDescription = await getVentureshipHeroDescription();
    
    // Process each company
    for (const company of companies) {
      // Use the hero description for all companies
      await updateCompanyMetaDescription(company.id, heroDescription);
      console.log(`Updated meta description for company ${company.name} with hero description`);
    }
    
    console.log('Completed meta description updates using hero description');
  } catch (error) {
    console.error('Error in fetchAndUpdateAllMetaDescriptions:', error);
  }
}
