// Main Color Palette
export const COLORS = {
    // Primary Colors
    green: '#ADF709',     // Lục - Vibrant Green
    pink: '#F3ADC3',      // Hồng - Soft Pink
    cyan: '#00CCFF',      // Xanh - Bright Cyan
    
    // Gradient Combinations
    gradients: {
        greenToCyan: 'from-[#ADF709] to-[#00CCFF]',
        pinkToGreen: 'from-[#F3ADC3] to-[#ADF709]',
        cyanToPink: 'from-[#00CCFF] to-[#F3ADC3]',
        rainbow: 'from-[#ADF709] via-[#00CCFF] to-[#F3ADC3]',
        cta: 'from-[#00CCFF] via-[#F3ADC3] to-[#ADF709]',
    },
    
    // Opacity Variations
    alpha: {
        green20: '#ADF709/20',
        green30: '#ADF709/30',
        pink20: '#F3ADC3/20',
        pink30: '#F3ADC3/30',
        cyan20: '#00CCFF/20',
        cyan30: '#00CCFF/30',
    }
};

// Usage Examples:
// Background: bg-[#ADF709]
// Text: text-[#F3ADC3]
// Border: border-[#00CCFF]
// Gradient: bg-gradient-to-r from-[#ADF709] to-[#00CCFF]
// With opacity: bg-[#ADF709]/20