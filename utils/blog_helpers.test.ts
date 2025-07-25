import { isRelevantPost, stripMarkdown } from './blog_helpers';

describe('stripMarkdown', () => {
  describe('with shortcodes', () => {
    const testDocument =
      'Hello, {{ WarningCallout text="TinaCloud is too cool for you" }}World!\n';
    const expected = 'Hello, World!\n';

    it('should remove shortcode markup', async () => {
      const stripped = await stripMarkdown(testDocument);
      expect(stripped.trim()).toEqual(expected.trim());
    });
  });
});

describe('stripMDX', () => {
  const testDocument =
    '<Youtube embedSrc="https://www.youtube.com/embed/RcR284ieUj0"/> TinaCMS has some exciting news for our herd!\n';
  const expected = 'TinaCMS has some exciting news for our herd!\n';

  it('should remove MDX markup', () => {
    const stripped = stripMarkdown(testDocument);
    expect(stripped).toEqual(expected.trim());
  });
});

describe('isRelevantPost', () => {
  it('returns false for old post', async () => {
    const isRelevant = await isRelevantPost({
      date: '03-03-2019',
      last_edited: null,
    });
    expect(isRelevant).toEqual(false);
  });

  it('returns true for an old post that has been updated', async () => {
    const isRelevant = await isRelevantPost({
      date: '03-03-2019',
      last_edited: new Date().toString(),
    });
    expect(isRelevant).toEqual(true);
  });

  it('returns false for an old post that has been updated before April 2020', async () => {
    const isRelevant = await isRelevantPost({
      date: '03-03-2019',
      last_edited: '2021-03-01',
    });
    expect(isRelevant).toEqual(false);
  });

  it('returns true for new post', async () => {
    const isRelevant = await isRelevantPost({
      date: new Date().toString(),
      last_edited: null,
    });
    expect(isRelevant).toEqual(true);
  });
});
