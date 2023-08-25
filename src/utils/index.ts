export const toRoman = (arabicNumber: number): string => {
    const romanNumerals: string[][] = [
        ['I', 'IV', 'V', 'IX'],
        ['X', 'XL', 'L', 'XC'],
        ['C', 'CD', 'D', 'CM'],
        ['M']
    ];

    let romanNumber: string = '';
    let digit: number;

    for (let i: number = 3; i >= 0; i--) {
        digit = Math.floor(arabicNumber / Math.pow(10, i));
        arabicNumber %= Math.pow(10, i);

        if (digit > 0) {
            if (digit <= 3) {
                romanNumber += romanNumerals[i][0].repeat(digit);
            } else if (digit === 4) {
                romanNumber += romanNumerals[i][1];
            } else if (digit === 5) {
                romanNumber += romanNumerals[i][2];
            } else if (digit <= 8) {
                romanNumber += romanNumerals[i][2] + romanNumerals[i][0].repeat(digit - 5);
            } else if (digit === 9) {
                romanNumber += romanNumerals[i][3];
            }
        }
    }

    return romanNumber;
}
