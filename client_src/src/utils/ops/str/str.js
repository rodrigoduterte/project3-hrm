const str = {
  toTitleCase: (s) => {
    return s.replace(
        /\w\S*/g,
        (txt) => {
            return txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase();
        }
    );
  },
  pluralY: (s) => {
    const lastidx = s.lastIndexOf('y');
    return s.substring(0, lastidx) + 'ies';
  },
  pluralUS: (s) => {
    return s + 'es';
  },
  pluralS: (s) => {
    return s.substring(0, s.length) + 's';
  },
  isSingularUS: (s) => {
    return s.substring(s.length - 2, s.length).toLowerCase() === 'us';
  },
  isSingularSS: (s) => {
    return s.substring(s.length - 2, s.length).toLowerCase() === 'ss';
  },
  isSingularY: (s) => {
    return s.lastIndexOf('y') === (s.length - 1);
  },
  isSingular: (s) => {
    return s.charAt(s.length - 1) !== 's'
  },
  plurality: (s) => {
    const tests = [ str.isSingularY , str.isSingularUS , str.isSingularSS, str.isSingular ];
    const actions = [ str.pluralY , str.pluralUS ,  str.pluralUS  , str.pluralS ];
    const results = [ tests[0](s) , tests[1](s) , tests[2](s),  tests[3](s)];

    const actionIdx = results.findIndex(res => res == true);

    return actionIdx !== -1 ? actions[actionIdx](s) : s;
  }
}

export default str;
