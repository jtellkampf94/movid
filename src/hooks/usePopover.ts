import { useState, useEffect } from "react";

export const usePopover = () => {
  const [showPopover, setShowPopover] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setShowPopover(false);
    }, 3000);
  }, [showPopover === true]);

  return { showPopover, setShowPopover };
};
