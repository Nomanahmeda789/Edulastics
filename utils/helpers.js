export const getFontSize = (fontSize) => {
  switch (fontSize) {
    case 'small':
      return '12px';
    case 'normal':
      return '14px';
    case 'large':
      return '16px';
    case 'xlarge':
      return '18px';
    case 'xxlarge':
      return '20px';
    default:
      return '14px';
  }
};
