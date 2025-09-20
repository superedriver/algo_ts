import { FileDescriptor, Flag } from './index';

describe('FileDescriptor Bitwise Operations', () => {
  let fileDescriptor: FileDescriptor;

  beforeEach(() => {
    fileDescriptor = new FileDescriptor(0);
  });

  describe('Flag enum', () => {
    test('should have correct binary values', () => {
      expect(Flag.User).toBe(0b1); // 1
      expect(Flag.Moderator).toBe(0b10); // 2
      expect(Flag.Admin).toBe(0b100); // 4
      expect(Flag.Owner).toBe(0b1000); // 8
    });
  });

  describe('addFlag', () => {
    test('should add User flag', () => {
      const result = fileDescriptor.addFlag(Flag.User);
      expect(result).toBe(1);
      expect(fileDescriptor.hasFlag(Flag.User)).toBe(true);
    });

    test('should add multiple flags', () => {
      fileDescriptor.addFlag(Flag.User);
      fileDescriptor.addFlag(Flag.Moderator);
      
      expect(fileDescriptor.hasFlag(Flag.User)).toBe(true);
      expect(fileDescriptor.hasFlag(Flag.Moderator)).toBe(true);
      expect(fileDescriptor.descriptor).toBe(3); // 0b11
    });

    test('should not duplicate existing flags', () => {
      fileDescriptor.addFlag(Flag.User);
      const initialDescriptor = fileDescriptor.descriptor;
      
      fileDescriptor.addFlag(Flag.User);
      
      expect(fileDescriptor.descriptor).toBe(initialDescriptor);
      expect(fileDescriptor.hasFlag(Flag.User)).toBe(true);
    });

    test('should add Admin and Owner flags', () => {
      fileDescriptor.addFlag(Flag.Admin);
      fileDescriptor.addFlag(Flag.Owner);
      
      expect(fileDescriptor.hasFlag(Flag.Admin)).toBe(true);
      expect(fileDescriptor.hasFlag(Flag.Owner)).toBe(true);
      expect(fileDescriptor.descriptor).toBe(12); // 0b1100
    });
  });

  describe('hasFlag', () => {
    test('should return false for empty descriptor', () => {
      expect(fileDescriptor.hasFlag(Flag.User)).toBe(false);
      expect(fileDescriptor.hasFlag(Flag.Admin)).toBe(false);
    });

    test('should return true for added flag', () => {
      fileDescriptor.addFlag(Flag.Moderator);
      expect(fileDescriptor.hasFlag(Flag.Moderator)).toBe(true);
    });

    test('should return false for not added flag', () => {
      fileDescriptor.addFlag(Flag.User);
      expect(fileDescriptor.hasFlag(Flag.Moderator)).toBe(false);
    });

    test('should work with multiple flags', () => {
      fileDescriptor.addFlag(Flag.User);
      fileDescriptor.addFlag(Flag.Admin);
      
      expect(fileDescriptor.hasFlag(Flag.User)).toBe(true);
      expect(fileDescriptor.hasFlag(Flag.Admin)).toBe(true);
      expect(fileDescriptor.hasFlag(Flag.Moderator)).toBe(false);
      expect(fileDescriptor.hasFlag(Flag.Owner)).toBe(false);
    });
  });

  describe('removeFlag', () => {
    test('should remove existing flag', () => {
      fileDescriptor.addFlag(Flag.User);
      expect(fileDescriptor.hasFlag(Flag.User)).toBe(true);
      
      const result = fileDescriptor.removeFlag(Flag.User);
      expect(result).toBe(0);
      expect(fileDescriptor.hasFlag(Flag.User)).toBe(false);
    });

    test('should not affect other flags when removing one', () => {
      fileDescriptor.addFlag(Flag.User);
      fileDescriptor.addFlag(Flag.Moderator);
      
      fileDescriptor.removeFlag(Flag.User);
      
      expect(fileDescriptor.hasFlag(Flag.User)).toBe(false);
      expect(fileDescriptor.hasFlag(Flag.Moderator)).toBe(true);
    });

    test('should return undefined when trying to remove non-existent flag', () => {
      const result = fileDescriptor.removeFlag(Flag.User);
      expect(result).toBeUndefined();
    });

    test('should handle complex flag combinations', () => {
      // Add all flags
      fileDescriptor.addFlag(Flag.User);
      fileDescriptor.addFlag(Flag.Moderator);
      fileDescriptor.addFlag(Flag.Admin);
      fileDescriptor.addFlag(Flag.Owner);
      
      expect(fileDescriptor.descriptor).toBe(15); // 0b1111
      
      // Remove Admin flag
      fileDescriptor.removeFlag(Flag.Admin);
      
      expect(fileDescriptor.hasFlag(Flag.User)).toBe(true);
      expect(fileDescriptor.hasFlag(Flag.Moderator)).toBe(true);
      expect(fileDescriptor.hasFlag(Flag.Admin)).toBe(false);
      expect(fileDescriptor.hasFlag(Flag.Owner)).toBe(true);
      expect(fileDescriptor.descriptor).toBe(11); // 0b1011
    });
  });

  describe('Edge cases', () => {
    test('should work with maximum flag combination', () => {
      fileDescriptor.addFlag(Flag.User);
      fileDescriptor.addFlag(Flag.Moderator);
      fileDescriptor.addFlag(Flag.Admin);
      fileDescriptor.addFlag(Flag.Owner);
      
      expect(fileDescriptor.descriptor).toBe(15); // 0b1111
      expect(fileDescriptor.hasFlag(Flag.User)).toBe(true);
      expect(fileDescriptor.hasFlag(Flag.Moderator)).toBe(true);
      expect(fileDescriptor.hasFlag(Flag.Admin)).toBe(true);
      expect(fileDescriptor.hasFlag(Flag.Owner)).toBe(true);
    });

    test('should handle removing all flags', () => {
      fileDescriptor.addFlag(Flag.User);
      fileDescriptor.addFlag(Flag.Moderator);
      
      fileDescriptor.removeFlag(Flag.User);
      fileDescriptor.removeFlag(Flag.Moderator);
      
      expect(fileDescriptor.descriptor).toBe(0);
      expect(fileDescriptor.hasFlag(Flag.User)).toBe(false);
      expect(fileDescriptor.hasFlag(Flag.Moderator)).toBe(false);
    });
  });
});
