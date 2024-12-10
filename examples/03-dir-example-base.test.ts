import { describe, it, expect } from 'vitest';

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

describe('Example-based test for sum of directory sizes', () => {
    it('should sum the sizes of all files in the directory structure', () => {
        const dir: Directory = {
            files: [{ size: 100 }, { size: 200 }],
            subdirectories: [
                { files: [{ size: 50 }] },
                { files: [{ size: 300 }, { size: 100 }], subdirectories: [{ files: [{ size: 400 }] }] }
            ]
        };
        expect(sumDirectorySize(dir)).toBe(1150); // 合計: 100 + 200 + 50 + 300 + 100 + 400 = 1150
    });
});
