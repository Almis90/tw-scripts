/*
* Script Name: Building Points
* Version: v1.0
* Last Updated: 2023-11-10
* Author: Almis
* Approved: N/A
* Approved Date: N/A
* Mod: N/A
*/

// User Input
if (typeof DEBUG !== 'boolean') DEBUG = true;

// Globals
const scriptConfig = {
  scriptData: {
    name: 'Building Points',
    version: 'v1.0',
    author: 'Almis',
  },
  translations: {
    en_DK: {
      'Points': 'Points',
      'GoToHeadquarters': 'Go to Headquarters and run again!',
      'max': 'max',
    },
  },
  allowedMarkets: [],
  allowedScreens: ['main'],
  allowedModes: [],
  isDebug: DEBUG,
}

// CONSTANTS
const buildings = {
  main_buildrow_main: [10, 2, 2, 3, 4, 4, 5, 6, 7, 9, 10, 12, 15, 18, 21, 26, 31, 37, 44, 53, 64, 77, 92, 110, 133, 159, 191, 229, 274, 330],
  main_buildrow_barracks: [16, 3, 4, 5, 5, 7, 8, 9, 12, 14, 16, 20, 24, 28, 34, 42, 49, 59, 71, 85, 102, 123, 147, 177, 212],
  main_buildrow_stable: [20, 4, 5, 6, 6, 9, 10, 12, 14, 17, 21, 25, 29, 36, 43, 51, 62, 74, 88, 107],
  main_buildrow_garage: [24, 5, 6, 6, 9, 10, 12, 14, 17, 21, 25, 29, 36, 43, 51],
  main_buildrow_church: [10, 2, 2],
  main_buildrow_church_f: [10],
  main_buildrow_watchtower: [42, 8, 10, 13, 14, 18, 20, 25, 31, 36, 43, 52, 62, 75, 90, 108, 130, 155, 186, 224],
  main_buildrow_snob: [512, 102, 123],
  main_buildrow_smith: [19, 4, 4, 6, 6, 8, 10, 11, 14, 16, 20, 23, 28, 34, 41, 49, 58, 71, 84, 101],
  main_buildrow_place: [0],
  main_buildrow_statue: [24],
  main_buildrow_market: [10, 2, 2, 3, 4, 4, 5, 6, 7, 9, 10, 12, 15, 18, 21, 26, 31, 37, 44, 53, 64, 77, 92, 110, 133],
  main_buildrow_wood: [6, 1, 2, 1, 2, 3, 3, 3, 5, 5, 6, 8, 8, 11, 13, 15, 19, 22, 27, 32, 38, 46, 55, 66, 80, 95, 115, 137, 165, 198],
  main_buildrow_stone: [6, 1, 2, 1, 2, 3, 3, 3, 5, 5, 6, 8, 8, 11, 13, 15, 19, 22, 27, 32, 38, 46, 55, 66, 80, 95, 115, 137, 165, 198],
  main_buildrow_iron: [6, 1, 2, 1, 2, 3, 3, 3, 5, 5, 6, 8, 8, 11, 13, 15, 19, 22, 27, 32, 38, 46, 55, 66, 80, 95, 115, 137, 165, 198],
  main_buildrow_farm: [5, 1, 1, 2, 1, 2, 3, 3, 3, 5, 5, 6, 8, 8, 11, 13, 15, 19, 22, 27, 32, 38, 46, 55, 66, 80, 95, 115, 137, 165],
  main_buildrow_storage: [6, 1, 1, 1, 2, 2, 3, 3, 3, 5, 5, 6, 8, 11, 13, 15, 19, 22, 27, 32, 38, 46, 55, 66, 80, 95, 115, 137, 165, 198],
  main_buildrow_hide: [5, 1, 1, 2, 1, 2, 3, 3, 3, 5],
  main_buildrow_wall: [8, 2, 2, 2, 3, 3, 4, 5, 5, 7, 9, 9, 12, 15, 17, 20, 25, 29, 36, 43, 47]
};

(async function () {
    function tt(string) {
      if (scriptConfig.translations[game_data.locale] !== undefined) {
          return scriptConfig.translations[game_data.locale][string];
      } else {
          return scriptConfig.translations['en_DK'][string];
      }
    }

    function getParameterByName(name, url = window.location.href) {
      return new URL(url).searchParams.get(name);
    }

    function isAllowedScreen() {
      return scriptConfig.allowedScreens.includes(
        getParameterByName('screen')
      );
    }

    function addPointsColumnToHeader() {
      const requirementsTh = document.querySelector('#buildings > tbody > tr:nth-child(1) > th:nth-child(1)');
      const pointsTh = document.createElement('th');

      pointsTh.textContent = tt('Points');

      requirementsTh.after(pointsTh);
    }
    
    function addPointsCellToBody(tr) {
      const key = tr.id;
      const level = extractLevel(tr.querySelector('td:nth-child(1) > span').textContent);
      const buildingTd = tr.firstElementChild;
      const pointsTd = document.createElement('td');

      pointsTd.textContent = buildings[key][level]?.toString() ?? tt('max');

      buildingTd.after(pointsTd);
    }
    
    function extractLevel(text) {
      const matches = text.match(/\d+/);
      return matches ? parseInt(matches[0]) : 0;
    }

    const trs = document.querySelectorAll('#buildings > tbody > tr[id]');

    for (let i = 0; i < trs.length; i++) {
      addPointsCellToBody(trs[i]);
    }

    const isValidScreen = isAllowedScreen();

    if (isValidScreen) {
      addPointsColumnToHeader();
    } else {
      UI.ErrorMessage(tt('GoToHeadquarters'));
    }
})();
