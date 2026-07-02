export interface CodingQuestion {
  id: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  topics: string[];
  problemStatement: string;
  initialCode: {
    javascript: string;
    python: string;
    cpp: string;
    java: string;
  };
}

export const codingQuestions: CodingQuestion[] = [
  {
    id: 'reverse-string',
    title: 'Reverse String',
    difficulty: 'Easy',
    topics: ['String', 'Two Pointers'],
    problemStatement: `Write a function that reverses a string. The input string is given as an array of characters s.

You must do this by modifying the input array in-place with O(1) extra memory.

Example 1:
  Input: s = ["h","e","l","l","o"]
  Output: ["o","l","l","e","h"]

Example 2:
  Input: s = ["H","a","n","n","a","h"]
  Output: ["h","a","n","n","a","H"]

Constraints:
  • 1 <= s.length <= 10^5
  • s[i] is a printable ascii character.`,
    initialCode: {
      javascript: `function reverseString(s) {\n  // Write your solution here\n}`,
      python: `def reverseString(s):\n    # Write your solution here\n    pass`,
      cpp: `#include <iostream>\n#include <vector>\nusing namespace std;\n\nvoid reverseString(vector<char>& s) {\n    // Write your solution here\n}`,
      java: `public class Main {\n    public static void reverseString(char[] s) {\n        // Write your solution here\n    }\n}`
    }
  },
  {
    id: 'contains-duplicate',
    title: 'Contains Duplicate',
    difficulty: 'Easy',
    topics: ['Array', 'Hash Table'],
    problemStatement: `Given an integer array nums, return true if any value appears at least twice in the array, and return false if every element is distinct.

Example 1:
  Input: nums = [1,2,3,1]
  Output: true

Example 2:
  Input: nums = [1,2,3,4]
  Output: false

Example 3:
  Input: nums = [1,1,1,3,3,4,3,2,4,2]
  Output: true

Constraints:
  • 1 <= nums.length <= 10^5
  • -10^9 <= nums[i] <= 10^9`,
    initialCode: {
      javascript: `function containsDuplicate(nums) {\n  // Write your solution here\n}`,
      python: `def containsDuplicate(nums):\n    # Write your solution here\n    pass`,
      cpp: `#include <iostream>\n#include <vector>\nusing namespace std;\n\nbool containsDuplicate(vector<int>& nums) {\n    // Write your solution here\n}`,
      java: `public class Main {\n    public static boolean containsDuplicate(int[] nums) {\n        // Write your solution here\n        return false;\n    }\n}`
    }
  },
  {
    id: 'valid-palindrome',
    title: 'Valid Palindrome',
    difficulty: 'Easy',
    topics: ['String', 'Two Pointers'],
    problemStatement: `A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward. Alphanumeric characters include letters and numbers.

Given a string s, return true if it is a palindrome, or false otherwise.

Example 1:
  Input: s = "A man, a plan, a canal: Panama"
  Output: true
  Explanation: "amanaplanacanalpanama" is a palindrome.

Example 2:
  Input: s = "race a car"
  Output: false
  Explanation: "raceacar" is not a palindrome.

Constraints:
  • 1 <= s.length <= 2 * 10^5
  • s consists only of printable ASCII characters.`,
    initialCode: {
      javascript: `function isPalindrome(s) {\n  // Write your solution here\n}`,
      python: `def isPalindrome(s):\n    # Write your solution here\n    pass`,
      cpp: `#include <iostream>\n#include <string>\nusing namespace std;\n\nbool isPalindrome(string s) {\n    // Write your solution here\n}`,
      java: `public class Main {\n    public static boolean isPalindrome(String s) {\n        // Write your solution here\n        return false;\n    }\n}`
    }
  },
  {
    id: 'move-zeroes',
    title: 'Move Zeroes',
    difficulty: 'Easy',
    topics: ['Array', 'Two Pointers'],
    problemStatement: `Given an integer array nums, move all 0's to the end of it while maintaining the relative order of the non-zero elements.

Note that you must do this in-place without making a copy of the array.

Example 1:
  Input: nums = [0,1,0,3,12]
  Output: [1,3,12,0,0]

Example 2:
  Input: nums = [0]
  Output: [0]

Constraints:
  • 1 <= nums.length <= 10^4
  • -2^31 <= nums[i] <= 2^31 - 1`,
    initialCode: {
      javascript: `function moveZeroes(nums) {\n  // Write your solution here\n}`,
      python: `def moveZeroes(nums):\n    # Write your solution here\n    pass`,
      cpp: `#include <iostream>\n#include <vector>\nusing namespace std;\n\nvoid moveZeroes(vector<int>& nums) {\n    // Write your solution here\n}`,
      java: `public class Main {\n    public static void moveZeroes(int[] nums) {\n        // Write your solution here\n    }\n}`
    }
  },
  {
    id: 'longest-common-prefix',
    title: 'Longest Common Prefix',
    difficulty: 'Easy',
    topics: ['String', 'Array'],
    problemStatement: `Write a function to find the longest common prefix string amongst an array of strings.

If there is no common prefix, return an empty string "".

Example 1:
  Input: strs = ["flower","flow","flight"]
  Output: "fl"

Example 2:
  Input: strs = ["dog","racecar","car"]
  Output: ""
  Explanation: There is no common prefix among the input strings.

Constraints:
  • 1 <= strs.length <= 200
  • 0 <= strs[i].length <= 200
  • strs[i] consists of only lowercase English letters.`,
    initialCode: {
      javascript: `function longestCommonPrefix(strs) {\n  // Write your solution here\n}`,
      python: `def longestCommonPrefix(strs):\n    # Write your solution here\n    pass`,
      cpp: `#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nstring longestCommonPrefix(vector<string>& strs) {\n    // Write your solution here\n}`,
      java: `public class Main {\n    public static String longestCommonPrefix(String[] strs) {\n        // Write your solution here\n        return "";\n    }\n}`
    }
  },
  {
    id: '1',
    title: 'Two Sum',
    difficulty: 'Easy',
    topics: ['Array', 'Hash Table'],
    problemStatement: `Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

You may assume that each input would have exactly one solution, and you may not use the same element twice. You can return the answer in any order.

Example 1:
  Input:  nums = [2, 7, 11, 15], target = 9
  Output: [0, 1]
  Explanation: nums[0] + nums[1] == 9, so we return [0, 1].

Example 2:
  Input:  nums = [3, 2, 4], target = 6
  Output: [1, 2]

Example 3:
  Input:  nums = [3, 3], target = 6
  Output: [0, 1]

Constraints:
  • 2 <= nums.length <= 10^4
  • -10^9 <= nums[i] <= 10^9
  • Only one valid answer exists.

Hint: Use a hash map to store seen values and their indices for O(n) solution.`,
    initialCode: {
      javascript: `function twoSum(nums, target) {\n  // Write your solution here\n}`,
      python: `def two_sum(nums, target):\n    # Write your solution here\n    pass`,
      cpp: `#include <iostream>\n#include <vector>\nusing namespace std;\n\nvector<int> twoSum(vector<int>& nums, int target) {\n    // Write your solution here\n}`,
      java: `import java.util.*;\n\npublic class Main {\n    public static int[] twoSum(int[] nums, int target) {\n        // Write your solution here\n        return new int[]{};\n    }\n}`
    }
  },
  {
    id: '2',
    title: 'Valid Parentheses',
    difficulty: 'Easy',
    topics: ['String', 'Stack'],
    problemStatement: `Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.

An input string is valid if:
  1. Open brackets must be closed by the same type of brackets.
  2. Open brackets must be closed in the correct order.
  3. Every close bracket has a corresponding open bracket of the same type.

Example 1:
  Input:  s = "()"
  Output: true

Example 2:
  Input:  s = "()[]{}"
  Output: true

Example 3:
  Input:  s = "(]"
  Output: false

Example 4:
  Input:  s = "{[]}"
  Output: true

Constraints:
  • 1 <= s.length <= 10^4
  • s consists of parentheses only '()[]{}'

Hint: Use a stack. Push opening brackets, pop when a closing bracket matches the top.`,
    initialCode: {
      javascript: `function isValid(s) {\n  // Write your solution here\n}`,
      python: `def is_valid(s):\n    # Write your solution here\n    pass`,
      cpp: `#include <iostream>\n#include <string>\nusing namespace std;\n\nbool isValid(string s) {\n    // Write your solution here\n}`,
      java: `public class Main {\n    public static boolean isValid(String s) {\n        // Write your solution here\n        return false;\n    }\n}`
    }
  },
  {
    id: '3',
    title: 'Merge Intervals',
    difficulty: 'Medium',
    topics: ['Array', 'Sorting'],
    problemStatement: `Given an array of intervals where intervals[i] = [starti, endi], merge all overlapping intervals, and return an array of the non-overlapping intervals.

Example 1:
  Input:  intervals = [[1,3],[2,6],[8,10],[15,18]]
  Output: [[1,6],[8,10],[15,18]]
  Explanation: Since [1,3] and [2,6] overlap, merge them into [1,6].

Example 2:
  Input:  intervals = [[1,4],[4,5]]
  Output: [[1,5]]
  Explanation: Intervals [1,4] and [4,5] are considered overlapping.

Constraints:
  • 1 <= intervals.length <= 10^4
  • intervals[i].length == 2
  • 0 <= starti <= endi <= 10^4

Hint: Sort by start time. Compare each interval's start with the last merged interval's end.`,
    initialCode: {
      javascript: `function merge(intervals) {\n  // Write your solution here\n}`,
      python: `def merge(intervals):\n    # Write your solution here\n    pass`,
      cpp: `#include <iostream>\n#include <vector>\nusing namespace std;\n\nvector<vector<int>> merge(vector<vector<int>>& intervals) {\n    // Write your solution here\n}`,
      java: `import java.util.*;\n\npublic class Main {\n    public static int[][] merge(int[][] intervals) {\n        // Write your solution here\n        return new int[][]{};\n    }\n}`
    }
  },
  {
    id: '4',
    title: 'Maximum Subarray',
    difficulty: 'Medium',
    topics: ['Array', 'Dynamic Programming'],
    problemStatement: `Given an integer array nums, find the subarray with the largest sum, and return its sum.

Example 1:
  Input:  nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4]
  Output: 6
  Explanation: The subarray [4, -1, 2, 1] has the largest sum = 6.

Example 2:
  Input:  nums = [1]
  Output: 1

Example 3:
  Input:  nums = [5, 4, -1, 7, 8]
  Output: 23

Constraints:
  • 1 <= nums.length <= 10^5
  • -10^4 <= nums[i] <= 10^4

Explanation (Kadane's Algorithm):
  currentSum = max(nums[i], currentSum + nums[i])
  maxSum = max(maxSum, currentSum)
  At each position, decide whether to extend the current subarray or start fresh.`,
    initialCode: {
      javascript: `function maxSubArray(nums) {\n  // Write your solution here\n}`,
      python: `def max_sub_array(nums):\n    # Write your solution here\n    pass`,
      cpp: `#include <iostream>\n#include <vector>\nusing namespace std;\n\nint maxSubArray(vector<int>& nums) {\n    // Write your solution here\n}`,
      java: `public class Main {\n    public static int maxSubArray(int[] nums) {\n        // Write your solution here\n        return 0;\n    }\n}`
    }
  },
  {
    id: '5',
    title: 'Contains Duplicate',
    difficulty: 'Easy',
    topics: ['Array', 'Hash Table'],
    problemStatement: `Given an integer array nums, return true if any value appears at least twice in the array, and return false if every element is distinct.

Example 1:
  Input:  nums = [1, 2, 3, 1]
  Output: true

Example 2:
  Input:  nums = [1, 2, 3, 4]
  Output: false

Example 3:
  Input:  nums = [1, 1, 1, 3, 3, 4, 3, 2, 4, 2]
  Output: true

Constraints:
  • 1 <= nums.length <= 10^5
  • -10^9 <= nums[i] <= 10^9

Hint: Use a HashSet. If you encounter an element already in the set, return true.`,
    initialCode: {
      javascript: `function containsDuplicate(nums) {\n  // Write your solution here\n}`,
      python: `def contains_duplicate(nums):\n    # Write your solution here\n    pass`,
      cpp: `#include <iostream>\n#include <vector>\nusing namespace std;\n\nbool containsDuplicate(vector<int>& nums) {\n    // Write your solution here\n}`,
      java: `public class Main {\n    public static boolean containsDuplicate(int[] nums) {\n        // Write your solution here\n        return false;\n    }\n}`
    }
  },
  {
    id: '6',
    title: 'Best Time to Buy and Sell Stock',
    difficulty: 'Easy',
    topics: ['Array', 'Dynamic Programming'],
    problemStatement: `You are given an array prices where prices[i] is the price of a given stock on the ith day.
You want to maximize your profit by choosing a single day to buy and a future day to sell.
Return the maximum profit achievable. If no profit is possible, return 0.

Example 1:
  Input:  prices = [7, 1, 5, 3, 6, 4]
  Output: 5
  Explanation: Buy on day 2 (price=1), sell on day 5 (price=6). Profit = 5.

Example 2:
  Input:  prices = [7, 6, 4, 3, 1]
  Output: 0
  Explanation: Prices are always falling; no profit possible.

Constraints:
  • 1 <= prices.length <= 10^5
  • 0 <= prices[i] <= 10^4

Hint: Track the minimum price seen so far. At each step, compute profit = price - minPrice and update max.`,
    initialCode: {
      javascript: `function maxProfit(prices) {\n  // Write your solution here\n}`,
      python: `def max_profit(prices):\n    # Write your solution here\n    pass`,
      cpp: `#include <iostream>\n#include <vector>\nusing namespace std;\n\nint maxProfit(vector<int>& prices) {\n    // Write your solution here\n}`,
      java: `public class Main {\n    public static int maxProfit(int[] prices) {\n        // Write your solution here\n        return 0;\n    }\n}`
    }
  },
  {
    id: '7',
    title: 'Valid Anagram',
    difficulty: 'Easy',
    topics: ['Hash Table', 'String', 'Sorting'],
    problemStatement: `Given two strings s and t, return true if t is an anagram of s, and false otherwise.

An Anagram is a word formed by rearranging the letters of another word, using all original letters exactly once.

Example 1:
  Input:  s = "anagram", t = "nagaram"
  Output: true

Example 2:
  Input:  s = "rat", t = "car"
  Output: false

Example 3:
  Input:  s = "listen", t = "silent"
  Output: true

Constraints:
  • 1 <= s.length, t.length <= 5 * 10^4
  • s and t consist of lowercase English letters.

Explanation:
  Approach 1 (Sort): Sort both strings, compare. O(n log n).
  Approach 2 (Hash Map): Count character frequencies in both. O(n).`,
    initialCode: {
      javascript: `function isAnagram(s, t) {\n  // Write your solution here\n}`,
      python: `def is_anagram(s, t):\n    # Write your solution here\n    pass`,
      cpp: `#include <iostream>\n#include <string>\nusing namespace std;\n\nbool isAnagram(string s, string t) {\n    // Write your solution here\n}`,
      java: `public class Main {\n    public static boolean isAnagram(String s, String t) {\n        // Write your solution here\n        return false;\n    }\n}`
    }
  },
  {
    id: '8',
    title: 'Climbing Stairs',
    difficulty: 'Easy',
    topics: ['Math', 'Dynamic Programming'],
    problemStatement: `You are climbing a staircase. It takes n steps to reach the top. Each time you can climb 1 or 2 steps. In how many distinct ways can you climb to the top?

Example 1:
  Input:  n = 2
  Output: 2
  Explanation: 1+1, 2

Example 2:
  Input:  n = 3
  Output: 3
  Explanation: 1+1+1, 1+2, 2+1

Example 3:
  Input:  n = 5
  Output: 8

Constraints:
  • 1 <= n <= 45

Explanation (Fibonacci):
  climbStairs(n) = climbStairs(n-1) + climbStairs(n-2)
  This is exactly the Fibonacci sequence! Use DP for O(n) time.`,
    initialCode: {
      javascript: `function climbStairs(n) {\n  // Write your solution here\n}`,
      python: `def climb_stairs(n):\n    # Write your solution here\n    pass`,
      cpp: `#include <iostream>\nusing namespace std;\n\nint climbStairs(int n) {\n    // Write your solution here\n}`,
      java: `public class Main {\n    public static int climbStairs(int n) {\n        // Write your solution here\n        return 0;\n    }\n}`
    }
  },
  {
    id: '9',
    title: 'Reverse Linked List',
    difficulty: 'Easy',
    topics: ['Linked List', 'Recursion'],
    problemStatement: `Given the head of a singly linked list, reverse the list, and return the reversed list.

Example 1:
  Input:  1 -> 2 -> 3 -> 4 -> 5
  Output: 5 -> 4 -> 3 -> 2 -> 1

Example 2:
  Input:  1 -> 2
  Output: 2 -> 1

Example 3:
  Input:  (empty)
  Output: (empty)

Constraints:
  • Number of nodes in [0, 5000]
  • -5000 <= Node.val <= 5000

Explanation (Iterative):
  Use prev=null, curr=head.
  Each step: save next → point curr.next to prev → advance both pointers.

Explanation (Recursive):
  Recursively reverse the rest, then fix the head's link.`,
    initialCode: {
      javascript: `class ListNode {\n  constructor(val = 0, next = null) {\n    this.val = val;\n    this.next = next;\n  }\n}\n\nfunction reverseList(head) {\n  // Write your solution here\n}`,
      python: `class ListNode:\n    def __init__(self, val=0, next=None):\n        self.val = val\n        self.next = next\n\ndef reverse_list(head):\n    # Write your solution here\n    pass`,
      cpp: `#include <iostream>\nusing namespace std;\n\nstruct ListNode {\n    int val;\n    ListNode* next;\n    ListNode(int x) : val(x), next(nullptr) {}\n};\n\nListNode* reverseList(ListNode* head) {\n    // Write your solution here\n}`,
      java: `public class Main {\n    static class ListNode {\n        int val;\n        ListNode next;\n        ListNode(int val) { this.val = val; }\n    }\n\n    public static ListNode reverseList(ListNode head) {\n        // Write your solution here\n        return null;\n    }\n}`
    }
  },
  {
    id: '10',
    title: 'Linked List Cycle',
    difficulty: 'Easy',
    topics: ['Hash Table', 'Linked List', 'Two Pointers'],
    problemStatement: `Given head, the head of a linked list, determine if the linked list has a cycle in it.

A cycle exists if some node can be reached again by continuously following the next pointer.

Example 1:
  Input:  3 -> 2 -> 0 -> -4 -> (back to 2)
  Output: true

Example 2:
  Input:  1 -> 2 -> (back to 1)
  Output: true

Example 3:
  Input:  1
  Output: false

Constraints:
  • Number of nodes in [0, 10^4].
  • -10^5 <= Node.val <= 10^5

Explanation (Floyd's Cycle Detection — Tortoise & Hare):
  slow moves 1 step, fast moves 2 steps.
  If there is a cycle, slow and fast will eventually meet.`,
    initialCode: {
      javascript: `class ListNode {\n  constructor(val = 0, next = null) {\n    this.val = val;\n    this.next = next;\n  }\n}\n\nfunction hasCycle(head) {\n  // Write your solution here\n}`,
      python: `class ListNode:\n    def __init__(self, val=0, next=None):\n        self.val = val\n        self.next = next\n\ndef has_cycle(head):\n    # Write your solution here\n    pass`,
      cpp: `#include <iostream>\nusing namespace std;\n\nstruct ListNode {\n    int val;\n    ListNode* next;\n    ListNode(int x) : val(x), next(nullptr) {}\n};\n\nbool hasCycle(ListNode* head) {\n    // Write your solution here\n}`,
      java: `public class Main {\n    static class ListNode {\n        int val;\n        ListNode next;\n        ListNode(int val) { this.val = val; }\n    }\n\n    public static boolean hasCycle(ListNode head) {\n        // Write your solution here\n        return false;\n    }\n}`
    }
  },
  {
    id: '11',
    title: 'Product of Array Except Self',
    difficulty: 'Medium',
    topics: ['Array', 'Prefix Sum'],
    problemStatement: `Given an integer array nums, return an array answer such that answer[i] equals the product of all elements except nums[i]. Must run in O(n) without division.

Example 1:
  Input:  nums = [1, 2, 3, 4]
  Output: [24, 12, 8, 6]

Example 2:
  Input:  nums = [-1, 1, 0, -3, 3]
  Output: [0, 0, 9, 0, 0]

Constraints:
  • 2 <= nums.length <= 10^5
  • -30 <= nums[i] <= 30

Explanation:
  Build a left prefix product array and a right suffix product array.
  answer[i] = leftProduct[i] * rightProduct[i].
  Can be done in O(1) extra space using a single output array.`,
    initialCode: {
      javascript: `function productExceptSelf(nums) {\n  // Write your solution here\n}`,
      python: `def product_except_self(nums):\n    # Write your solution here\n    pass`,
      cpp: `#include <iostream>\n#include <vector>\nusing namespace std;\n\nvector<int> productExceptSelf(vector<int>& nums) {\n    // Write your solution here\n}`,
      java: `public class Main {\n    public static int[] productExceptSelf(int[] nums) {\n        // Write your solution here\n        return new int[]{};\n    }\n}`
    }
  },
  {
    id: '12',
    title: 'Top K Frequent Elements',
    difficulty: 'Medium',
    topics: ['Array', 'Hash Table', 'Heap'],
    problemStatement: `Given an integer array nums and an integer k, return the k most frequent elements. You may return the answer in any order.

Example 1:
  Input:  nums = [1, 1, 1, 2, 2, 3], k = 2
  Output: [1, 2]
  Explanation: 1 appears 3 times, 2 appears 2 times.

Example 2:
  Input:  nums = [1], k = 1
  Output: [1]

Constraints:
  • 1 <= nums.length <= 10^5
  • k is in range [1, number of unique elements].

Explanation (Bucket Sort — O(n)):
  Count frequencies. Create bucket[i] = list of numbers with frequency i.
  Iterate from the end to collect top k elements.`,
    initialCode: {
      javascript: `function topKFrequent(nums, k) {\n  // Write your solution here\n}`,
      python: `def top_k_frequent(nums, k):\n    # Write your solution here\n    pass`,
      cpp: `#include <iostream>\n#include <vector>\nusing namespace std;\n\nvector<int> topKFrequent(vector<int>& nums, int k) {\n    // Write your solution here\n}`,
      java: `import java.util.*;\n\npublic class Main {\n    public static int[] topKFrequent(int[] nums, int k) {\n        // Write your solution here\n        return new int[]{};\n    }\n}`
    }
  },
  {
    id: '13',
    title: 'Longest Palindromic Substring',
    difficulty: 'Medium',
    topics: ['String', 'Dynamic Programming'],
    problemStatement: `Given a string s, return the longest palindromic substring in s.

A palindrome reads the same forward and backward.

Example 1:
  Input:  s = "babad"
  Output: "bab" (or "aba")

Example 2:
  Input:  s = "cbbd"
  Output: "bb"

Example 3:
  Input:  s = "racecar"
  Output: "racecar"

Constraints:
  • 1 <= s.length <= 1000
  • s consists of only digits and English letters.

Explanation (Expand Around Center — O(n²)):
  For each character (and gap between characters), expand outward while characters match.
  There are 2n-1 centers: n for odd-length palindromes, n-1 for even-length.`,
    initialCode: {
      javascript: `function longestPalindrome(s) {\n  // Write your solution here\n}`,
      python: `def longest_palindrome(s):\n    # Write your solution here\n    pass`,
      cpp: `#include <iostream>\n#include <string>\nusing namespace std;\n\nstring longestPalindrome(string s) {\n    // Write your solution here\n}`,
      java: `public class Main {\n    public static String longestPalindrome(String s) {\n        // Write your solution here\n        return "";\n    }\n}`
    }
  },
  {
    id: '14',
    title: 'Group Anagrams',
    difficulty: 'Medium',
    topics: ['Array', 'Hash Table', 'String'],
    problemStatement: `Given an array of strings strs, group the anagrams together. You may return the answer in any order.

Example 1:
  Input:  strs = ["eat","tea","tan","ate","nat","bat"]
  Output: [["bat"],["nat","tan"],["ate","eat","tea"]]

Example 2:
  Input:  strs = [""]
  Output: [[""]]

Constraints:
  • 1 <= strs.length <= 10^4
  • 0 <= strs[i].length <= 100
  • strs[i] consists of lowercase English letters.

Explanation:
  For each string, create a canonical key (e.g., sorted version).
  "eat", "tea", "ate" all sort to "aet" — group them together.
  Use a HashMap: key = sorted string, value = list of anagrams.`,
    initialCode: {
      javascript: `function groupAnagrams(strs) {\n  // Write your solution here\n}`,
      python: `def group_anagrams(strs):\n    # Write your solution here\n    pass`,
      cpp: `#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nvector<vector<string>> groupAnagrams(vector<string>& strs) {\n    // Write your solution here\n}`,
      java: `import java.util.*;\n\npublic class Main {\n    public static List<List<String>> groupAnagrams(String[] strs) {\n        // Write your solution here\n        return new ArrayList<>();\n    }\n}`
    }
  },
  {
    id: '15',
    title: 'Search in Rotated Sorted Array',
    difficulty: 'Medium',
    topics: ['Array', 'Binary Search'],
    problemStatement: `A sorted array has been rotated at some pivot. Given the rotated array and a target, return the index of target or -1 if not found. Must run in O(log n).

Example 1:
  Input:  nums = [4,5,6,7,0,1,2], target = 0
  Output: 4

Example 2:
  Input:  nums = [4,5,6,7,0,1,2], target = 3
  Output: -1

Example 3:
  Input:  nums = [1], target = 0
  Output: -1

Constraints:
  • 1 <= nums.length <= 5000
  • All values of nums are unique.

Explanation (Modified Binary Search):
  At every midpoint, one half is always sorted.
  Check which half is sorted, then determine if target lies in that half.`,
    initialCode: {
      javascript: `function search(nums, target) {\n  // Write your solution here\n}`,
      python: `def search(nums, target):\n    # Write your solution here\n    pass`,
      cpp: `#include <iostream>\n#include <vector>\nusing namespace std;\n\nint search(vector<int>& nums, int target) {\n    // Write your solution here\n}`,
      java: `public class Main {\n    public static int search(int[] nums, int target) {\n        // Write your solution here\n        return -1;\n    }\n}`
    }
  },
  {
    id: '16',
    title: 'Number of Islands',
    difficulty: 'Medium',
    topics: ['Array', 'Depth-First Search', 'Breadth-First Search', 'Union Find'],
    problemStatement: `Given an m x n binary grid of '1's (land) and '0's (water), return the number of islands.

An island is surrounded by water and formed by connecting adjacent lands horizontally or vertically.

Example 1:
  Input:
    [["1","1","1","1","0"],
     ["1","1","0","1","0"],
     ["1","1","0","0","0"],
     ["0","0","0","0","0"]]
  Output: 1

Example 2:
  Input:
    [["1","1","0","0","0"],
     ["1","1","0","0","0"],
     ["0","0","1","0","0"],
     ["0","0","0","1","1"]]
  Output: 3

Constraints:
  • m == grid.length, n == grid[i].length
  • 1 <= m, n <= 300

Explanation (DFS):
  When you find a '1', increment count and DFS to mark all connected '1's as visited.`,
    initialCode: {
      javascript: `function numIslands(grid) {\n  // Write your solution here\n}`,
      python: `def num_islands(grid):\n    # Write your solution here\n    pass`,
      cpp: `#include <iostream>\n#include <vector>\nusing namespace std;\n\nint numIslands(vector<vector<char>>& grid) {\n    // Write your solution here\n}`,
      java: `public class Main {\n    public static int numIslands(char[][] grid) {\n        // Write your solution here\n        return 0;\n    }\n}`
    }
  },
  {
    id: '17',
    title: 'Course Schedule',
    difficulty: 'Medium',
    topics: ['Graph', 'Topological Sort', 'Depth-First Search'],
    problemStatement: `There are numCourses courses (0 to numCourses-1). Given prerequisites[i] = [a, b] meaning you must take b before a, return true if you can finish all courses (no cycles).

Example 1:
  Input:  numCourses = 2, prerequisites = [[1,0]]
  Output: true
  Explanation: Take 0, then 1.

Example 2:
  Input:  numCourses = 2, prerequisites = [[1,0],[0,1]]
  Output: false
  Explanation: 0 and 1 depend on each other — cycle!

Example 3:
  Input:  numCourses = 4, prerequisites = [[1,0],[2,1],[3,2]]
  Output: true

Constraints:
  • 1 <= numCourses <= 2000
  • 0 <= prerequisites.length <= 5000

Explanation (DFS Cycle Detection):
  States: 0=unvisited, 1=in current path, 2=fully processed.
  If you revisit a state-1 node, a cycle exists → return false.`,
    initialCode: {
      javascript: `function canFinish(numCourses, prerequisites) {\n  // Write your solution here\n}`,
      python: `def can_finish(num_courses, prerequisites):\n    # Write your solution here\n    pass`,
      cpp: `#include <iostream>\n#include <vector>\nusing namespace std;\n\nbool canFinish(int numCourses, vector<vector<int>>& prerequisites) {\n    // Write your solution here\n}`,
      java: `import java.util.*;\n\npublic class Main {\n    public static boolean canFinish(int numCourses, int[][] prerequisites) {\n        // Write your solution here\n        return false;\n    }\n}`
    }
  },
  {
    id: '18',
    title: 'Word Break',
    difficulty: 'Medium',
    topics: ['Hash Table', 'String', 'Dynamic Programming'],
    problemStatement: `Given a string s and a dictionary wordDict, return true if s can be segmented into a space-separated sequence of one or more dictionary words.

Example 1:
  Input:  s = "leetcode", wordDict = ["leet","code"]
  Output: true
  Explanation: "leet" + "code"

Example 2:
  Input:  s = "applepenapple", wordDict = ["apple","pen"]
  Output: true
  Explanation: "apple" + "pen" + "apple"

Example 3:
  Input:  s = "catsandog", wordDict = ["cats","dog","sand","and","cat"]
  Output: false

Constraints:
  • 1 <= s.length <= 300

Explanation (Bottom-up DP):
  dp[i] = true if s[0..i-1] can be segmented.
  dp[0] = true (empty string).
  For each i, check all j where dp[j]=true and s[j..i-1] is in wordDict.`,
    initialCode: {
      javascript: `function wordBreak(s, wordDict) {\n  // Write your solution here\n}`,
      python: `def word_break(s, word_dict):\n    # Write your solution here\n    pass`,
      cpp: `#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nbool wordBreak(string s, vector<string>& wordDict) {\n    // Write your solution here\n}`,
      java: `import java.util.*;\n\npublic class Main {\n    public static boolean wordBreak(String s, List<String> wordDict) {\n        // Write your solution here\n        return false;\n    }\n}`
    }
  },
  {
    id: '19',
    title: 'Longest Consecutive Sequence',
    difficulty: 'Medium',
    topics: ['Array', 'Hash Table', 'Union Find'],
    problemStatement: `Given an unsorted array of integers nums, return the length of the longest consecutive elements sequence. Must run in O(n).

Example 1:
  Input:  nums = [100, 4, 200, 1, 3, 2]
  Output: 4
  Explanation: Longest consecutive sequence is [1, 2, 3, 4].

Example 2:
  Input:  nums = [0, 3, 7, 2, 5, 8, 4, 6, 0, 1]
  Output: 9

Constraints:
  • 0 <= nums.length <= 10^5
  • -10^9 <= nums[i] <= 10^9

Explanation (Hash Set — O(n)):
  Add all numbers to a Set.
  For each number n, only start counting if n-1 is NOT in the set.
  Count n, n+1, n+2, ... and track the maximum length.`,
    initialCode: {
      javascript: `function longestConsecutive(nums) {\n  // Write your solution here\n}`,
      python: `def longest_consecutive(nums):\n    # Write your solution here\n    pass`,
      cpp: `#include <iostream>\n#include <vector>\nusing namespace std;\n\nint longestConsecutive(vector<int>& nums) {\n    // Write your solution here\n}`,
      java: `public class Main {\n    public static int longestConsecutive(int[] nums) {\n        // Write your solution here\n        return 0;\n    }\n}`
    }
  },
  {
    id: '20',
    title: 'Trapping Rain Water',
    difficulty: 'Hard',
    topics: ['Array', 'Two Pointers', 'Dynamic Programming'],
    problemStatement: `Given n non-negative integers representing an elevation map where each bar has width 1, compute how much water it can trap after raining.

Example 1:
  Input:  height = [0,1,0,2,1,0,1,3,2,1,2,1]
  Output: 6

Example 2:
  Input:  height = [4,2,0,3,2,5]
  Output: 9

Constraints:
  • n == height.length
  • 1 <= n <= 2 * 10^4
  • 0 <= height[i] <= 10^5

Explanation (Two Pointers — O(n)):
  Use left and right pointers with leftMax and rightMax.
  Water at position i = min(leftMax, rightMax) - height[i].
  Process the side with the smaller max height at each step.`,
    initialCode: {
      javascript: `function trap(height) {\n  // Write your solution here\n}`,
      python: `def trap(height):\n    # Write your solution here\n    pass`,
      cpp: `#include <iostream>\n#include <vector>\nusing namespace std;\n\nint trap(vector<int>& height) {\n    // Write your solution here\n}`,
      java: `public class Main {\n    public static int trap(int[] height) {\n        // Write your solution here\n        return 0;\n    }\n}`
    }
  },
  {
    id: '21',
    title: 'Edit Distance',
    difficulty: 'Hard',
    topics: ['String', 'Dynamic Programming'],
    problemStatement: `Given two strings word1 and word2, return the minimum number of operations to convert word1 to word2. Operations: Insert, Delete, or Replace a character.

Example 1:
  Input:  word1 = "horse", word2 = "ros"
  Output: 3
  Explanation:
    horse → rorse (replace h→r)
    rorse → rose  (delete r)
    rose  → ros   (delete e)

Example 2:
  Input:  word1 = "intention", word2 = "execution"
  Output: 5

Constraints:
  • 0 <= word1.length, word2.length <= 500

Explanation (2D DP):
  dp[i][j] = min edits to convert word1[0..i-1] to word2[0..j-1].
  If chars match: dp[i][j] = dp[i-1][j-1].
  Else: dp[i][j] = 1 + min(delete, insert, replace).`,
    initialCode: {
      javascript: `function minDistance(word1, word2) {\n  // Write your solution here\n}`,
      python: `def min_distance(word1, word2):\n    # Write your solution here\n    pass`,
      cpp: `#include <iostream>\n#include <string>\nusing namespace std;\n\nint minDistance(string word1, string word2) {\n    // Write your solution here\n}`,
      java: `public class Main {\n    public static int minDistance(String word1, String word2) {\n        // Write your solution here\n        return 0;\n    }\n}`
    }
  },
  {
    id: '22',
    title: 'Minimum Window Substring',
    difficulty: 'Hard',
    topics: ['Hash Table', 'String', 'Sliding Window'],
    problemStatement: `Given two strings s and t, return the minimum window substring of s that contains every character in t (including duplicates). If no such substring exists, return "".

Example 1:
  Input:  s = "ADOBECODEBANC", t = "ABC"
  Output: "BANC"

Example 2:
  Input:  s = "a", t = "a"
  Output: "a"

Example 3:
  Input:  s = "a", t = "aa"
  Output: ""

Constraints:
  • 1 <= s.length, t.length <= 10^5

Explanation (Sliding Window):
  Use left/right pointers and a frequency map.
  Expand right until all chars are satisfied (have == need).
  Then shrink left to minimize the window, updating the result.`,
    initialCode: {
      javascript: `function minWindow(s, t) {\n  // Write your solution here\n}`,
      python: `def min_window(s, t):\n    # Write your solution here\n    pass`,
      cpp: `#include <iostream>\n#include <string>\nusing namespace std;\n\nstring minWindow(string s, string t) {\n    // Write your solution here\n}`,
      java: `public class Main {\n    public static String minWindow(String s, String t) {\n        // Write your solution here\n        return "";\n    }\n}`
    }
  },
  {
    id: '23',
    title: 'Longest Repeating Character Replacement',
    difficulty: 'Medium',
    topics: ['Hash Table', 'String', 'Sliding Window'],
    problemStatement: `Given a string s and integer k, you can replace at most k characters. Return the length of the longest substring with all the same letter you can get.

Example 1:
  Input:  s = "ABAB", k = 2
  Output: 4
  Explanation: Replace 2 A's or B's → "AAAA" or "BBBB".

Example 2:
  Input:  s = "AABABBA", k = 1
  Output: 4

Constraints:
  • 1 <= s.length <= 10^5
  • s consists of uppercase English letters.
  • 0 <= k <= s.length

Explanation (Sliding Window):
  Window is valid if: (window size) - (most frequent char count) <= k.
  If invalid, shrink the window from the left.`,
    initialCode: {
      javascript: `function characterReplacement(s, k) {\n  // Write your solution here\n}`,
      python: `def character_replacement(s, k):\n    # Write your solution here\n    pass`,
      cpp: `#include <iostream>\n#include <string>\nusing namespace std;\n\nint characterReplacement(string s, int k) {\n    // Write your solution here\n}`,
      java: `public class Main {\n    public static int characterReplacement(String s, int k) {\n        // Write your solution here\n        return 0;\n    }\n}`
    }
  },
  {
    id: '24',
    title: 'Find Minimum in Rotated Sorted Array',
    difficulty: 'Medium',
    topics: ['Array', 'Binary Search'],
    problemStatement: `A sorted array has been rotated 1 to n times. Return the minimum element. Must run in O(log n).

Example 1:
  Input:  nums = [3,4,5,1,2]
  Output: 1

Example 2:
  Input:  nums = [4,5,6,7,0,1,2]
  Output: 0

Example 3:
  Input:  nums = [11,13,15,17]
  Output: 11

Constraints:
  • 1 <= n <= 5000
  • All values are unique.

Explanation (Binary Search):
  If nums[mid] > nums[right], the minimum is in the right half.
  Otherwise, the minimum is in the left half (including mid).`,
    initialCode: {
      javascript: `function findMin(nums) {\n  // Write your solution here\n}`,
      python: `def find_min(nums):\n    # Write your solution here\n    pass`,
      cpp: `#include <iostream>\n#include <vector>\nusing namespace std;\n\nint findMin(vector<int>& nums) {\n    // Write your solution here\n}`,
      java: `public class Main {\n    public static int findMin(int[] nums) {\n        // Write your solution here\n        return 0;\n    }\n}`
    }
  },
  {
    id: '25',
    title: 'Merge K Sorted Lists',
    difficulty: 'Hard',
    topics: ['Linked List', 'Divide and Conquer', 'Heap'],
    problemStatement: `You are given an array of k sorted linked lists. Merge all of them into one sorted linked list and return it.

Example 1:
  Input:  lists = [[1,4,5],[1,3,4],[2,6]]
  Output: 1->1->2->3->4->4->5->6

Example 2:
  Input:  lists = []
  Output: []

Constraints:
  • k == lists.length
  • 0 <= k <= 10^4

Explanation (Divide and Conquer — O(N log k)):
  Pair up lists and merge them two at a time.
  Repeat until only one sorted list remains.

  Alternative: Use a Min-Heap. Push heads of all lists, repeatedly extract the minimum.`,
    initialCode: {
      javascript: `class ListNode {\n  constructor(val = 0, next = null) {\n    this.val = val;\n    this.next = next;\n  }\n}\n\nfunction mergeKLists(lists) {\n  // Write your solution here\n}`,
      python: `class ListNode:\n    def __init__(self, val=0, next=None):\n        self.val = val\n        self.next = next\n\ndef merge_k_lists(lists):\n    # Write your solution here\n    pass`,
      cpp: `#include <iostream>\n#include <vector>\nusing namespace std;\n\nstruct ListNode {\n    int val;\n    ListNode* next;\n    ListNode(int x) : val(x), next(nullptr) {}\n};\n\nListNode* mergeKLists(vector<ListNode*>& lists) {\n    // Write your solution here\n}`,
      java: `public class Main {\n    static class ListNode {\n        int val;\n        ListNode next;\n        ListNode(int val) { this.val = val; }\n    }\n\n    public static ListNode mergeKLists(ListNode[] lists) {\n        // Write your solution here\n        return null;\n    }\n}`
    }
  },
  {
    id: '26',
    title: 'N-Queens',
    difficulty: 'Hard',
    topics: ['Array', 'Backtracking'],
    problemStatement: `Place n queens on an n x n chessboard such that no two queens attack each other. Return all distinct solutions.

Each solution is a board where 'Q' = queen, '.' = empty space.

Example (n = 4):
  Output: [
    [".Q..","...Q","Q...","..Q."],
    ["..Q.","Q...","...Q",".Q.."]
  ]
  There are exactly 2 solutions for n=4.

Example (n = 1):
  Output: [["Q"]]

Constraints:
  • 1 <= n <= 9

Explanation (Backtracking):
  Place queens row by row. For each row, try each column.
  Skip positions conflicting in column, diagonal, or anti-diagonal.
  Use sets for O(1) conflict checks.`,
    initialCode: {
      javascript: `function solveNQueens(n) {\n  // Write your solution here\n}`,
      python: `def solve_n_queens(n):\n    # Write your solution here\n    pass`,
      cpp: `#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nvector<vector<string>> solveNQueens(int n) {\n    // Write your solution here\n}`,
      java: `import java.util.*;\n\npublic class Main {\n    public static List<List<String>> solveNQueens(int n) {\n        // Write your solution here\n        return new ArrayList<>();\n    }\n}`
    }
  },
  {
    id: '27',
    title: 'Word Search',
    difficulty: 'Medium',
    topics: ['Array', 'Backtracking', 'Depth-First Search'],
    problemStatement: `Given an m x n character grid and a string word, return true if word exists in the grid. The word must be formed by sequentially adjacent cells (horizontally or vertically). A cell may not be used more than once.

Example 1:
  Board: [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]]
  word = "ABCCED" → true (A→B→C→C→E→D)
  word = "SEE"    → true
  word = "ABCB"   → false (B cannot be reused)

Constraints:
  • m == board.length, n == board[i].length
  • 1 <= m, n <= 6

Hint: DFS + Backtracking. Mark cell as '#' while visiting, restore after.`,
    initialCode: {
      javascript: `function exist(board, word) {\n  // Write your solution here\n}`,
      python: `def exist(board, word):\n    # Write your solution here\n    pass`,
      cpp: `#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nbool exist(vector<vector<char>>& board, string word) {\n    // Write your solution here\n}`,
      java: `public class Main {\n    public static boolean exist(char[][] board, String word) {\n        // Write your solution here\n        return false;\n    }\n}`
    }
  },
  {
    id: '28',
    title: 'Binary Tree Maximum Path Sum',
    difficulty: 'Hard',
    topics: ['Tree', 'Depth-First Search', 'Dynamic Programming'],
    problemStatement: `A path in a binary tree is a sequence of nodes connected by edges. Each node can appear at most once. The path does not need to go through the root. Return the maximum path sum.

Example 1:
  Input:  root = [1, 2, 3]
  Output: 6
  Explanation: 2 → 1 → 3, sum = 6.

Example 2:
  Input:  root = [-10, 9, 20, null, null, 15, 7]
  Output: 42
  Explanation: 15 → 20 → 7, sum = 42.

Constraints:
  • Nodes in [1, 3 * 10^4]
  • -1000 <= Node.val <= 1000

Explanation (Post-order DFS):
  For each node: pathSum = node.val + max(leftGain, 0) + max(rightGain, 0).
  The gain returned upward = node.val + max(leftGain, rightGain, 0).`,
    initialCode: {
      javascript: `class TreeNode {\n  constructor(val = 0, left = null, right = null) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nfunction maxPathSum(root) {\n  // Write your solution here\n}`,
      python: `class TreeNode:\n    def __init__(self, val=0, left=None, right=None):\n        self.val = val\n        self.left = left\n        self.right = right\n\ndef max_path_sum(root):\n    # Write your solution here\n    pass`,
      cpp: `#include <iostream>\nusing namespace std;\n\nstruct TreeNode {\n    int val;\n    TreeNode *left, *right;\n    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}\n};\n\nint maxPathSum(TreeNode* root) {\n    // Write your solution here\n}`,
      java: `public class Main {\n    static class TreeNode {\n        int val;\n        TreeNode left, right;\n        TreeNode(int val) { this.val = val; }\n    }\n\n    public static int maxPathSum(TreeNode root) {\n        // Write your solution here\n        return 0;\n    }\n}`
    }
  },
  {
    id: '29',
    title: 'Kth Smallest Element in BST',
    difficulty: 'Medium',
    topics: ['Tree', 'Depth-First Search', 'Binary Search Tree'],
    problemStatement: `Given the root of a Binary Search Tree (BST) and an integer k, return the kth smallest value (1-indexed) among all node values.

Example 1:
  Input:  root = [3,1,4,null,2], k = 1
  Output: 1
  (In-order: 1, 2, 3, 4 → 1st smallest = 1)

Example 2:
  Input:  root = [5,3,6,2,4,null,null,1], k = 3
  Output: 3
  (In-order: 1, 2, 3, 4, 5, 6 → 3rd smallest = 3)

Constraints:
  • 1 <= k <= n <= 10^4
  • 0 <= Node.val <= 10^4

Explanation:
  In-order traversal of a BST (Left→Node→Right) visits nodes in ascending order.
  Simply return the kth value encountered.`,
    initialCode: {
      javascript: `class TreeNode {\n  constructor(val = 0, left = null, right = null) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nfunction kthSmallest(root, k) {\n  // Write your solution here\n}`,
      python: `class TreeNode:\n    def __init__(self, val=0, left=None, right=None):\n        self.val = val\n        self.left = left\n        self.right = right\n\ndef kth_smallest(root, k):\n    # Write your solution here\n    pass`,
      cpp: `#include <iostream>\nusing namespace std;\n\nstruct TreeNode {\n    int val;\n    TreeNode *left, *right;\n    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}\n};\n\nint kthSmallest(TreeNode* root, int k) {\n    // Write your solution here\n}`,
      java: `public class Main {\n    static class TreeNode {\n        int val;\n        TreeNode left, right;\n        TreeNode(int val) { this.val = val; }\n    }\n\n    public static int kthSmallest(TreeNode root, int k) {\n        // Write your solution here\n        return 0;\n    }\n}`
    }
  },
  {
    id: '30',
    title: 'Coin Change',
    difficulty: 'Medium',
    topics: ['Array', 'Dynamic Programming', 'Breadth-First Search'],
    problemStatement: `Given coins of different denominations and a total amount, return the fewest number of coins needed to make that amount. If it's not possible, return -1. You have an infinite number of each coin.

Example 1:
  Input:  coins = [1,5,2], amount = 11
  Output: 3
  Explanation: 11 = 5 + 5 + 1

Example 2:
  Input:  coins = [2], amount = 3
  Output: -1

Example 3:
  Input:  coins = [1], amount = 0
  Output: 0

Constraints:
  • 1 <= coins.length <= 12
  • 0 <= amount <= 10^4

Explanation (Bottom-up DP):
  dp[0] = 0. All other dp[i] = Infinity.
  For each amount i: dp[i] = min(dp[i], dp[i - coin] + 1) for all coins.`,
    initialCode: {
      javascript: `function coinChange(coins, amount) {\n  // Write your solution here\n}`,
      python: `def coin_change(coins, amount):\n    # Write your solution here\n    pass`,
      cpp: `#include <iostream>\n#include <vector>\nusing namespace std;\n\nint coinChange(vector<int>& coins, int amount) {\n    // Write your solution here\n}`,
      java: `import java.util.*;\n\npublic class Main {\n    public static int coinChange(int[] coins, int amount) {\n        // Write your solution here\n        return -1;\n    }\n}`
    }
  }
];