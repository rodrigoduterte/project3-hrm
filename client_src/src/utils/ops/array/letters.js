let letters = [...Array(26)].map((_, i) => String.fromCharCode('A'.charCodeAt(0) + i));
letters.unshift("All");

export default letters;
