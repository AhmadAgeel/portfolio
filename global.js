console.log("IT'S ALIVE!");

function $$(selector, context = document) {
  return Array.from(context.querySelectorAll(selector));
}


// let navLinks = $$('nav a')
// let currentLink = navLinks.find(
//   a => a.host === location.host
//   && a.pathname === location.pathname
// )

// if (currentLink) {
//   currentLink.classList.add('current')
// }

// currentLink?.classList.add('current')
const BASE_PATH = (location.hostname === 'localhost' 
  || location.hostname === '127.0.0.1')
  ? '/'                  // Local server
  : 'https://ahmadageel.github.io/portfolio/';         // GitHub Pages repo name

let pages = [
  { url: '', title: 'Home' },
  { url: 'projects/', title: 'Projects' },
  { url: 'contact/', title: 'Contact' },
  { url: 'https://github.com/AhmadAgeel', title: 'Profile' },
  { url: 'cv/', title: 'CV' },
];

let nav = document.createElement('nav');
document.body.prepend(nav);

for (let p of pages) {
  let url = p.url;
  url = !url.startsWith('http') ? BASE_PATH + url : url;
  let title = p.title;
  let a = document.createElement('a');
  a.href = url;
  a.textContent = title;
  a.classList.toggle(
    'current',
    a.host === location.host 
    && a.pathname === location.pathname,
  );
  if (a.host !== location.host)
    a.target = '_blank';
  nav.append(a);
}

document.body.insertAdjacentHTML(
  'afterbegin',
  `
	<label class="color-scheme">
		Theme:
		<select>
			<option value="light dark">Automatic</option>
      <option value="light">Light</option>
      <option value="dark">Dark</option>
		</select>
	</label>
  `,
);

function setColorScheme(colorScheme) {
  document.documentElement.style.setProperty(
    'color-scheme',
     colorScheme
  );
}

let select = document.querySelector('select')
if ('colorScheme' in localStorage) {
  let colorScheme = localStorage.colorScheme;
  setColorScheme(colorScheme);
  select.value = colorScheme;
}

select.addEventListener(
  'input',
  function (event) { //unnamed function
    let colorScheme = event.target.value;
    // console.log('color scheme changed to', event.target.value);
    setColorScheme(colorScheme);
    localStorage.colorScheme = colorScheme;
  }
);


let form = document.querySelector('form');
form?.addEventListener(
  'submit',
  function (event) {
    event.preventDefault()
    let data = new FormData(form);
    let url = form.action + '?';
    for (let [name, value] of data)
      url +=  name + '=' + encodeURIComponent(value) + '?';
    location.href = url;
  }
);

// mailto:leaverou@mit.edu?subject=Hello&body=Sup?


export async function fetchJSON(url) {
  try {
    // Fetch the JSON file from the given URL
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch projects: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching or parsing JSON data:', error);
  }
}

// export function renderProjects(project, containerElement) {
//   containerElement.innerHTML = '';
//   const article = document.createElement('article');
//   article.innerHTML = `
//     <h3>${project.title}</h3>
//     <img src="${project.image}" alt="${project.title}">
//     <p>${project.description}</p>
//   `;
//   containerElement.appendChild(article);

// }

export function renderProjects(project, containerElement, headingLevel = 'h2') {
  // write javascript that will allow dynamic heading levels based on previous function
}

export async function fetchGitHubData(username) {
  // return statement here
  return fetchJSON(`https://api.github.com/users/${username}`);

}