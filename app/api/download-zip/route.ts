import { NextRequest, NextResponse } from "next/server";

// Simple ZIP file creation without external dependencies
// Uses the ZIP format specification directly
function createZipBuffer(files: { name: string; content: string }[]): Buffer {
  const entries: Buffer[] = [];
  const centralDir: Buffer[] = [];
  let offset = 0;

  for (const file of files) {
    const nameBuffer = Buffer.from(file.name, "utf-8");
    const contentBuffer = Buffer.from(file.content, "utf-8");
    const crc = crc32(contentBuffer);

    // Local file header
    const localHeader = Buffer.alloc(30 + nameBuffer.length);
    localHeader.writeUInt32LE(0x04034b50, 0); // signature
    localHeader.writeUInt16LE(20, 4); // version needed
    localHeader.writeUInt16LE(0, 6); // flags
    localHeader.writeUInt16LE(0, 8); // compression (none)
    localHeader.writeUInt16LE(0, 10); // mod time
    localHeader.writeUInt16LE(0, 12); // mod date
    localHeader.writeUInt32LE(crc, 14); // crc-32
    localHeader.writeUInt32LE(contentBuffer.length, 18); // compressed size
    localHeader.writeUInt32LE(contentBuffer.length, 22); // uncompressed size
    localHeader.writeUInt16LE(nameBuffer.length, 26); // filename length
    localHeader.writeUInt16LE(0, 28); // extra field length
    nameBuffer.copy(localHeader, 30);

    entries.push(localHeader, contentBuffer);

    // Central directory entry
    const centralEntry = Buffer.alloc(46 + nameBuffer.length);
    centralEntry.writeUInt32LE(0x02014b50, 0); // signature
    centralEntry.writeUInt16LE(20, 4); // version made by
    centralEntry.writeUInt16LE(20, 6); // version needed
    centralEntry.writeUInt16LE(0, 8); // flags
    centralEntry.writeUInt16LE(0, 10); // compression
    centralEntry.writeUInt16LE(0, 12); // mod time
    centralEntry.writeUInt16LE(0, 14); // mod date
    centralEntry.writeUInt32LE(crc, 16); // crc-32
    centralEntry.writeUInt32LE(contentBuffer.length, 20); // compressed
    centralEntry.writeUInt32LE(contentBuffer.length, 24); // uncompressed
    centralEntry.writeUInt16LE(nameBuffer.length, 28); // filename length
    centralEntry.writeUInt16LE(0, 30); // extra field length
    centralEntry.writeUInt16LE(0, 32); // comment length
    centralEntry.writeUInt16LE(0, 34); // disk number
    centralEntry.writeUInt16LE(0, 36); // internal attrs
    centralEntry.writeUInt32LE(0, 38); // external attrs
    centralEntry.writeUInt32LE(offset, 42); // local header offset
    nameBuffer.copy(centralEntry, 46);

    centralDir.push(centralEntry);
    offset += localHeader.length + contentBuffer.length;
  }

  const centralDirBuffer = Buffer.concat(centralDir);
  const centralDirOffset = offset;

  // End of central directory
  const endRecord = Buffer.alloc(22);
  endRecord.writeUInt32LE(0x06054b50, 0); // signature
  endRecord.writeUInt16LE(0, 4); // disk number
  endRecord.writeUInt16LE(0, 6); // start disk
  endRecord.writeUInt16LE(files.length, 8); // entries on disk
  endRecord.writeUInt16LE(files.length, 10); // total entries
  endRecord.writeUInt32LE(centralDirBuffer.length, 12); // central dir size
  endRecord.writeUInt32LE(centralDirOffset, 16); // central dir offset
  endRecord.writeUInt16LE(0, 20); // comment length

  return Buffer.concat([...entries, centralDirBuffer, endRecord]);
}

// CRC-32 implementation
function crc32(buf: Buffer): number {
  let crc = 0xffffffff;
  for (let i = 0; i < buf.length; i++) {
    crc ^= buf[i];
    for (let j = 0; j < 8; j++) {
      crc = (crc >>> 1) ^ (crc & 1 ? 0xedb88320 : 0);
    }
  }
  return (crc ^ 0xffffffff) >>> 0;
}

export async function POST(request: NextRequest) {
  try {
    const { boilerplate, documentation, stack } = await request.json();

    const files: { name: string; content: string }[] = [];

    // Parse boilerplate files
    if (boilerplate) {
      const fileSections = boilerplate.split("==== FILE:").slice(1);
      for (const section of fileSections) {
        const lines = section.trim().split("\n");
        const filename = lines[0].replace(/====/g, "").trim();
        const content = lines.slice(1).join("\n").trim();
        if (filename && content) {
          files.push({ name: filename, content });
        }
      }
    }

    // Add documentation files
    if (documentation?.raw) {
      const raw = documentation.raw;

      const parseDocSection = (type: string): string => {
        const markers = [
          `==== DOCUMENT: ${type.toUpperCase()}.md ====`,
          `## ${type.toUpperCase()}.md`,
        ];
        for (const marker of markers) {
          const start = raw.indexOf(marker);
          if (start === -1) continue;
          const contentStart = start + marker.length;
          const nextPatterns = ["==== DOCUMENT:", `## README`, `## SETUP`, `## ARCHITECTURE`];
          let end = raw.length;
          for (const p of nextPatterns) {
            const idx = raw.indexOf(p, contentStart);
            if (idx !== -1 && idx < end) end = idx;
          }
          return raw.substring(contentStart, end).trim();
        }
        return "";
      };

      const readme = parseDocSection("README");
      const setup = parseDocSection("SETUP");
      const architecture = parseDocSection("ARCHITECTURE");

      if (readme) files.push({ name: "README.md", content: readme });
      if (setup) files.push({ name: "SETUP.md", content: setup });
      if (architecture) files.push({ name: "ARCHITECTURE.md", content: architecture });
    }

    // Add stack recommendation as JSON
    if (stack) {
      files.push({
        name: "stack-recommendation.json",
        content: JSON.stringify(stack, null, 2),
      });
    }

    if (files.length === 0) {
      return NextResponse.json(
        { error: "No files to package" },
        { status: 400 },
      );
    }

    const zipBuffer = createZipBuffer(files);

    return new NextResponse(new Uint8Array(zipBuffer), {
      headers: {
        "Content-Type": "application/zip",
        "Content-Disposition": 'attachment; filename="devarchitect-project.zip"',
      },
    });
  } catch (error: unknown) {
    console.error("ZIP error:", error);
    return NextResponse.json(
      { error: "Failed to create ZIP" },
      { status: 500 },
    );
  }
}
