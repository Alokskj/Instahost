import { useEffect, useRef } from 'react';
import { toast } from 'sonner';
import { getRandomToastMessage } from '@/lib/funnyToastMessages';
import { GITHUB_REPO_URL } from '@/lib/constant';

interface UseAutoToastOptions {
  initialDelay?: number; // Delay before first toast (in ms)
  interval?: number; // Interval between toasts (in ms)
  enabled?: boolean; // Enable/disable the auto toast
}

export const useAutoToast = ({
  initialDelay = 5000, // 5 seconds default
  interval = 120000, // 2 minutes default
  enabled = true,
}: UseAutoToastOptions = {}) => {
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const shownMessages = useRef<Set<string>>(new Set());

  const showToast = () => {
    const message = getRandomToastMessage();
    
    // Reset if all messages have been shown
    if (shownMessages.current.size >= 20) {
      shownMessages.current.clear();
    }
    
    // Avoid showing the same message consecutively
    let attempts = 0;
    let selectedMessage = message;
    while (shownMessages.current.has(selectedMessage.title) && attempts < 5) {
      selectedMessage = getRandomToastMessage();
      attempts++;
    }
    
    shownMessages.current.add(selectedMessage.title);

    toast(selectedMessage.title, {
      description: selectedMessage.description,
      duration: 8000,
    });
  };

  useEffect(() => {
    if (!enabled) {
      return;
    }

    // Clear any existing timers
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    // Show first toast after initial delay
    timeoutRef.current = setTimeout(() => {
      showToast();

      // Then show toast at regular intervals
      intervalRef.current = setInterval(() => {
        showToast();
      }, interval);
    }, initialDelay);

    // Cleanup function
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      // Dismiss all toasts when component unmounts (switching pages)
      toast.dismiss();
    };
  }, [initialDelay, interval, enabled]);

  return { showToast };
};
