//deprecated and for deletion possibly
export default class Hmenu {
  constructor(conf,mod,submodule){
    this.v = conf.menu.v;
    this.h = conf.menu.h;
    this.mod = mod;
    this.submodule = submodule;
  }
  vfilter = title => {
    return vi => {
      return vi.title === title;
    };
  };

  search = () => this.v.filter(this.vfilter(this.mod))[0]['search'][this.submodule];
  menutitles = () => {
    let indicesOfhtitles = this.v.filter(this.vfilter(this.mod))[0]["h.title"][this.submodule];

    return indicesOfhtitles
      ? indicesOfhtitles.map(idx => {
          return {
            title: this.h[idx].title,
            module: this.mod,
            submodule: this.submodule
          };
        })
      : [];
  }
};
