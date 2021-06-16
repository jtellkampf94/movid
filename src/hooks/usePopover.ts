import { useState, useEffect } from "react";

export const usePopover = () => {
  const [showPopover, setShowPopover] = useState(false);

  useEffect(() => {
    if (showPopover) {
      const timer = setTimeout(() => {
        setShowPopover(false);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [showPopover]);

  return { showPopover, setShowPopover };
};
