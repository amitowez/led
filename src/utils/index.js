function isSizeValid(size, minSize) {
  return size > minSize;
}

export function getElementPosition(clickPosition, [dx, dy], currentControl, minSize) {
  const {
    width: originalWidth,
    height: originalHeight,
    top: originalTop,
    left: originalLeft
  } = clickPosition;
  switch (currentControl) {
    case "right":
      if (isSizeValid(originalWidth + dx, minSize)) {
        return {
          width: originalWidth + dx
        };
      }
    case "left":
      const newLeft = originalLeft + dx;
      const newWidth = originalWidth - dx;
      if (newLeft < 0 || !isSizeValid(newWidth, minSize)) {
        return;
      }
      return {
        width: originalWidth - dx,
        left: originalLeft + dx
      };
    case "top":
      const newTop = originalTop + dy;
      const newHeight = originalHeight - dy;
      if (newTop < 0 || !isSizeValid(newHeight, minSize)) {
        return;
      }
      return {
        height: originalHeight - dy,
        top: newTop
      };
    case "bottom":
      if (!isSizeValid(originalHeight + dy, minSize)) {
        return;
      }
      return { height: originalHeight + dy };
    case "center":
      return {
        left: dx + originalLeft,
        top: dy + originalTop
      };
    default:
      break;
  }
}

export function checkBounds(position, bounds) {
  if (!position) {
    return;
  }
  return Object.entries(position).reduce(
    (previousValue, [key, value]) => ({
      ...previousValue,
      [key]: restrictToBounds(value, bounds[key].min, bounds[key].max)
    }),
    {}
  );
}

export function getBounds(
  { width: parentWidth, height: parentHeight },
  { width, height, top, left }
) {
  return {
    left: {
      min: 0,
      max: parentWidth - width
    },
    top: {
      min: 0,
      max: parentHeight - height
    },
    height: {
      min: 0,
      max: parentHeight - top
    },
    width: {
      min: 0,
      max: parentWidth - left
    }
  };
}

export function restrictToBounds(value, min, max) {
  if (min !== null && value < min) {
    return min;
  }

  if (max !== null && max < value) {
    return max;
  }

  return value;
}
