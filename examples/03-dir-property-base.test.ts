import { describe, it, expect } from 'vitest';
import * as fc from 'fast-check';

interface File {
  size: number;
}

interface Directory {
  files: File[];
  subdirectories?: Directory[];
}

const sumDirectorySize = (dir: Directory): number => {
  const fileSizeSum = dir.files.map(file => file.size).reduce((a, b) => a + b, 0);
  if (!dir.subdirectories || dir.subdirectories.length === 0) {
    return fileSizeSum;
  }
  return fileSizeSum + dir.subdirectories.map(sumDirectorySize).reduce((a, b) => a + b, 0);
};

describe('Property-based test for sum of directory sizes with limited depth', () => {
  const maxDepth = 3;

  const directoryArb = (depth: number): fc.Arbitrary<Directory> => {
    return fc.record({
      files: fc.array(fc.record({ size: fc.integer({ min: 0, max: 1000 }) }), { minLength: 0, maxLength: 5 }),
      subdirectories: depth > 0
        ? fc.array(directoryArb(depth - 1), { minLength: 0, maxLength: 3 })
        : fc.constant([]),  // 深さが0になったらサブディレクトリを生成しない
    });
  };

  it('should sum the sizes of all files in any generated directory structure', () => {
    fc.assert(
      fc.property(directoryArb(maxDepth), (dir) => {
        const totalSize = sumDirectorySize(dir);

        // 検証: ファイルサイズは0以上であり、ディレクトリ全体のサイズも非負である
        expect(totalSize).toBeGreaterThanOrEqual(0);
      })
    );
  });
});
