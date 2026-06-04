export class Slug {
  public value: string
  constructor(value: string) {
    this.value = value
  }

  /**
   * Recives a string and returns a slugified version of it a slug.
   * Example: "How to create a slug?" => "how-to-create-a-slug"
   * @param text {string}
   */

  static createFromText(text: string) {
    const slugifiedText = text
      .normalize('NFKD')
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')
      .replace(/[^\w\-]+/g, '')
      .replace(/\-\-+/g, '-')
      .replace(/--/g, '-')
      .replace(/-$/g, '')
    return new Slug(slugifiedText)
  }
}
