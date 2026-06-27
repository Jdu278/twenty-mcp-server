import { getInstructionsContent } from './instructions.js';

describe('getInstructionsContent', () => {
  it('describes the meta-tool workflow in discovery mode', () => {
    const text = getInstructionsContent(true);

    expect(text).toContain('getTwentyToolSpec');
    expect(text).toContain('executeTwentyApiCall');
    // getTwentyToolSpec takes the batch array form, not the old single-string `toolName`
    expect(text).toContain('toolNames: ["createOneCompany"]');
    expect(text).not.toContain('getTwentyToolSpec({ toolName:');
  });

  it('describes native per-operation tools and omits the meta-tool workflow in native mode', () => {
    const text = getInstructionsContent(false);

    expect(text).toContain('its own tool');
    expect(text).not.toContain('executeTwentyApiCall');
    expect(text).not.toContain('getTwentyToolSpec');
  });

  it('always includes the shared best-practices body', () => {
    for (const mode of [true, false]) {
      const text = getInstructionsContent(mode);
      expect(text).toContain('## Best Practices');
      // the critical note-linking guidance must survive in both modes
      expect(text).toContain('createOneNoteTarget');
    }
  });
});
