


let inputSelected = undefined;
const _OPENMENU_MENU_ID = '__open_menu_id'

let _MENU_HTML = [
    { title: 'Add...', page: 'Add' }
  ];


chrome.storage.local.get('menu', function(result) {
    if (result.menu)
    {
        ///const list = JSON.parse(result.menu);
        _MENU_HTML = [... _MENU_HTML.filter(_=>_.title==='Add'), ... result.menu]
    }
        
  });


window.addEventListener('load', function(e){
   
    addMenu();

    const inputTexts = document.querySelectorAll('input[type="text"]');
    inputTexts.forEach(_=>{
        _.addEventListener('click', (e)=>showMenu(e));
    });
});
