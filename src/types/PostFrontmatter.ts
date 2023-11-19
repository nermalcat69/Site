import type { ReadTimeResults } from 'reading-time';

/**
 * Interface representing the frontmatter of a blog post.
 */
export interface PostFrontmatter {
  /** Tags associated with the post. */
  tags: string[];
  
  /** Href values for the post. */
  href: string[];

  /** Source values for the post. */
  src: string[];

  /**
   * Optional description for the post, visible in Open Graph cards.
   */
  description?: string;

  /**
   * Optional URL to a picture or a dict of URLs to pictures.
   */
  img?: string | {
    /** Image for the Open Graph social card. */
    og?: string;
    /** Image for the post header. */
    src?: string;
  };

  /**
   * Title of the post.
   * Computed by derivedTitleAndDatePlugin from the file name if not given.
   */
  title: string;

  /**
   * Date of the post.
   * Computed by derivedTitleAndDatePlugin from the git commit time if not given.
   */
  date: string;

  /**
   * Layout of the post.
   * Computed by defaultLayoutPlugin.
   */
  layout?: string;

  /**
   * Path of the post.
   * Computed by urlOutsideOfPagesDirPlugin.
   */
  path: string;

  /**
   * Reading time information for the post.
   * Computed by readingTimePlugin.
   * @example
   * {
   *   text: '1 min read',
   *   minutes: 1,
   *   time: 60000,
   *   words: 200
   * }
   */
  readingTime: ReadTimeResults;

  /** Indicates whether the post is a draft. */
  draft?: boolean;
}