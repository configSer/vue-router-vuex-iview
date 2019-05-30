/*
* xs	<576px
  sm	≥576px
  md	≥768px
  lg	≥992px
  xl	≥1200px
  xxl	≥1600px
*
* */

(function () {
  let xs = 576, sm = 576, md = 768, lg = 992, xl = 1200, xxl = 1600
  let wid = document.documentElement.clientWidth;
  let fontSize =
    wid < xs  ? 10 : wid >= xs && wid < sm
    ? wid/sm  * 10 : wid >= md && wid < lg
    ? wid/md  * 10 : wid >= lg && wid < xl
    ? wid/lg  * 10 : wid >=xl && wid < xxl
    ? wid/xl * 10 : wid >= xxl
    ? wid/xxl * 10 : 10;
  document.documentElement.style.fontSize = fontSize +"px";
}());
