// bootstrap
import '../scss/styles.scss'
import * as bootstrap from 'bootstrap'

// importa toastr e chartjs
import Chart from 'chart.js/auto';

import { Notyf } from 'notyf';
import 'notyf/notyf.min.css'; // for React, Vue and Svelte
const notyf = new Notyf();

const URL = "https://itdimaggio.edu.it/espweather/getjsdata.php";

window.post = function (url, data) {
  return fetch(url, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
};

// registra service worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('../service-worker.js');
}

/*!
 * Color mode toggler for Bootstrap's docs (https://getbootstrap.com/)
 * Copyright 2011-2023 The Bootstrap Authors
 * Licensed under the Creative Commons Attribution 3.0 Unported License.
 */

(() => {
  'use strict'

  const storedTheme = localStorage.getItem('theme')

  const getPreferredTheme = () => {
    if (storedTheme) {
      return storedTheme
    }

    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  }

  const setTheme = function (theme) {
    if (theme === 'auto' && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.documentElement.setAttribute('data-bs-theme', 'dark')
    } else {
      document.documentElement.setAttribute('data-bs-theme', theme)
    }
  }

  setTheme(getPreferredTheme())

  const showActiveTheme = (theme, focus = false) => {
    const themeSwitcher = document.querySelector('#bd-theme')

    if (!themeSwitcher) {
      return
    }

    const themeSwitcherText = document.querySelector('#bd-theme-text')
    const activeThemeIcon = document.querySelector('.theme-icon-active use')
    const btnToActive = document.querySelector(`[data-bs-theme-value="${theme}"]`)
    const svgOfActiveBtn = btnToActive.querySelector('svg use').getAttribute('href')

    document.querySelectorAll('[data-bs-theme-value]').forEach(element => {
      element.classList.remove('active')
      element.setAttribute('aria-pressed', 'false')
    })

    btnToActive.classList.add('active')
    btnToActive.setAttribute('aria-pressed', 'true')
    activeThemeIcon.setAttribute('href', svgOfActiveBtn)
    const themeSwitcherLabel = `${themeSwitcherText.textContent} (${btnToActive.dataset.bsThemeValue})`
    themeSwitcher.setAttribute('aria-label', themeSwitcherLabel)

    if (focus) {
      themeSwitcher.focus()
    }
  }

  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    if (storedTheme !== 'light' || storedTheme !== 'dark') {
      setTheme(getPreferredTheme())
    }
  })

  window.addEventListener('DOMContentLoaded', () => {
    showActiveTheme(getPreferredTheme())

    document.querySelectorAll('[data-bs-theme-value]')
      .forEach(toggle => {
        toggle.addEventListener('click', () => {
          const theme = toggle.getAttribute('data-bs-theme-value')
          localStorage.setItem('theme', theme)
          setTheme(theme)
          showActiveTheme(theme, true)
        })
      })
  })
})()

// codice rubato da EspWeather (progetto vecchio di 3 anni)
// giuriamo che il prodotto finale non sarà questo!

var intervallo = "1h";
var tempgraphobj = document.getElementById("graficoTemperatura");

const config_temperatura = {
  type: 'line',
  data: {
    labels: [
    ],
    datasets: [{
      data: [
      ],
      label: 'Temperature',
      lineTension: 0,
      backgroundColor: 'transparent',
      borderColor: '#DC3545',
      borderWidth: 1,
      pointBackgroundColor: '#DC3545'
    }]
  },
  options: {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: false,
        text: 'Grafico Temperatura'
      }
    }
  },
};
var tempgraph = new Chart(tempgraphobj, config_temperatura)
var umidgraphobj = document.getElementById("graficoUmidita");
var umidgraph = new Chart(umidgraphobj, {
  type: 'line',
  data: {
    labels: [
    ],
    datasets: [{
      data: [
      ],
      lineTension: 0,
      label: 'Humidity',
      backgroundColor: 'transparent',
      borderColor: '#007BFF',
      borderWidth: 1,
      pointBackgroundColor: '#007BFF'
    }]
  },
  options: {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: false,
        text: 'Grafico Umidità'
      }
    }
  },
})
var pressgraphobj = document.getElementById("graficoPressione");
var pressgraph = new Chart(pressgraphobj, {
  type: 'line',
  data: {
    labels: [
    ],
    datasets: [{
      data: [
      ],
      label: 'Pressure',
      lineTension: 0,
      backgroundColor: 'transparent',
      borderColor: '#FFC107',
      borderWidth: 1,
      pointBackgroundColor: '#FFC107'
    }]
  },
  options: {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: false,
        text: 'Grafico Pressione'
      }
    }
  },
})

function fetchJsonData() {
  try {
    post(URL, {
      intervallo: intervallo,
    })
      .then((response) => {
        if (!response.ok) {
          notyf.error("Server error: " + response.status);
        }
        return response.json();
      })
      .then((response) => {
        // controlla risposta
        tempgraph.data.labels = [];
        tempgraph.data.datasets.forEach((dataset) => {
          dataset.data = [];
        });
        umidgraph.data.labels = [];
        umidgraph.data.datasets.forEach((dataset) => {
          dataset.data = [];
        });
        pressgraph.data.labels = [];
        pressgraph.data.datasets.forEach((dataset) => {
          dataset.data = [];
        });

        let result = response;
        document.getElementById("datelbl").innerText = result.date;
        document.getElementById("timelbl").innerText = result.time;
        document.getElementById("templbl").innerText = result.temp;
        document.getElementById("presslbl").innerText = result.press;
        document.getElementById("umidlbl").innerText = result.umidit;
        if (result.alarm) {
          // I dati potrebbero non essere aggiornati, controlla il backend!
          notyf.error("Data might not be up to date! Check the sensor status.")
        }
        result.datastore.reverse();
        result.datastore.forEach(function (arrayItem) {
          tempgraph.data.labels.push(arrayItem.time);
          //tempgraph.data.labels.reverse();
          tempgraph.data.datasets.forEach((dataset) => {
            dataset.data.push(arrayItem.temp);
            //dataset.data.reverse();
          });
          umidgraph.data.labels.push(arrayItem.time);
          //umidgraph.data.labels.reverse();
          umidgraph.data.datasets.forEach((dataset) => {
            dataset.data.push(arrayItem.umidit);
            //dataset.data.reverse();
          });
          pressgraph.data.labels.push(arrayItem.time);
          //pressgraph.data.labels.reverse();
          pressgraph.data.datasets.forEach((dataset) => {
            dataset.data.push(arrayItem.press);
            //dataset.data.reverse();
          });
        });
        tempgraph.update();
        umidgraph.update();
        pressgraph.update();

      });
  } catch (error) {
    notyf.error("Server error: " + error);
  }
}

function btnGroupToggleSwitch(name) {
  Array.from(document.getElementsByClassName("switcher")).forEach((element) => {
    element.classList.remove('active');
  });
  Array.from(document.getElementsByClassName("switcher")).forEach((element) => {
    element.classList.remove('aria-current');
  });
  intervallo = name;
  document.getElementById(name + "btn").classList.add("active");
  document.getElementById(name + "btn").setAttribute('aria-current', 'page');
  document.getElementById(name + "btn").blur();
  fetchJsonData();
}

function btnReload() {
  fetchJsonData();
  document.getElementById("rels").blur();
}

function autoReload() {
  if (document.getElementById("flexSwitchCheckChecked").checked) {
    fetchJsonData();
  }
}

document.getElementById("rels").addEventListener("click", btnReload);
document.getElementById("1hbtn").addEventListener("click", () => { btnGroupToggleSwitch('1h') });
document.getElementById("2hbtn").addEventListener("click", () => { btnGroupToggleSwitch('2h') });
document.getElementById("4hbtn").addEventListener("click", () => { btnGroupToggleSwitch('4h') });
document.getElementById("6hbtn").addEventListener("click", () => { btnGroupToggleSwitch('6h') });
document.getElementById("wholebtn").addEventListener("click", () => { btnGroupToggleSwitch('whole') });

setInterval(autoReload, 60 * 1000);

fetchJsonData();