const links = document.getElementsByTagName("a");

[...links].forEach(link => {
  link.addEventListener("mouseover", handleMouseOver);
  link.addEventListener("mousemove", handleMouseMove);
  link.addEventListener("mouseleave", handleMouseLeave);
});

function handlePosition(e) {
  const ID = e.target.getAttribute("data-hover-id");
  const wrapper = document.getElementById(ID);
  let top = "";
  if (
  !(e.target.getBoundingClientRect().top + wrapper.offsetHeight > innerHeight))
  {
    top = `${e.clientY + e.target.offsetHeight}px`;
  } else {
    top = `${e.clientY - (wrapper.offsetHeight + e.target.offsetHeight)}px`;
  }

  return `position: fixed; left: ${e.clientX -
  wrapper.offsetWidth / 2}px; top:${top}`;
}

function handleMouseOver(e) {
  const hoverContent = e.target.getAttribute("data-hover-simply");
  const ID = Math.random().
  toString(36).
  substr(2, 9);
  const wrapper = document.createElement("DIV");
  e.target.setAttribute("data-hover-id", ID);
  wrapper.setAttribute("data-hover-wrapper", "");
  wrapper.setAttribute("id", ID);
  wrapper.setAttribute("style", "opacity: 0; transform: scale(.8)");
  wrapper.innerHTML = hoverContent;
  document.body.append(wrapper);
  wrapper.setAttribute("style", handlePosition(e));

  // You can remove this line when you are using. I had added for the demo.
  if (document.querySelector('.info')) document.querySelector('.info').remove();

}

function handleMouseLeave(e) {
  const ID = e.target.getAttribute("data-hover-id");
  document.getElementById(ID).style.opacity = 0;
  document.getElementById(ID).style.transform = "scale(.8)";
  setTimeout(() => {
    document.getElementById(ID).remove();
  }, 150);
}

function handleMouseMove(e) {
  const ID = e.target.getAttribute("data-hover-id");
  const wrapper = document.getElementById(ID);
  wrapper.setAttribute("style", handlePosition(e));
}

window.addEventListener('scroll', () => {
  const wrapper = document.querySelector('[data-hover-wrapper]');
  if (wrapper) wrapper.remove();
});