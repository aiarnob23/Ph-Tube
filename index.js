//variable for handling sort
var livePageCatId;

// get all categories 
const loadCategories = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/videos/categories');
    const data = await res.json();
    setTabs(data.data);
}
loadCategories();

// set tabs
const setTabs = (data) => {
    const tabsDiv = document.getElementById('tabs-div');
    data.forEach(catObj => {
        const category = catObj.category;
        const tab = document.createElement('a');
        tab.innerHTML = `<a id="tab-${catObj.category_id}" onclick="loadCategory('${catObj.category_id}')" class="tab btn bg-[#25252521] normal-case text-black">${category}</a>`;
        tabsDiv.appendChild(tab);
    });
}

// load cards by id
const loadCards = async (id) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${id}`);
    const data = await res.json();
    
    if (data.data.length > 0) {
        const temp = data.data;
        handleDisplayCard(temp);
    }
    else if (data.data.length < 1) {
        document.getElementById('void-section').innerHTML = `<img class="h-40 w-40" src="./img/Icon.png" alt="">
       <h3 class="text-4xl font-bold">Oops!! Sorry, There is no <br> content here</h3>`
    }
}
loadCards(1000);
livePageCatId=1000;

// display cards
const handleDisplayCard = (temp) =>{
    const cardSection = document.getElementById('cards-section');
    cardSection.innerHTML='';
    temp.forEach(card => {
        const cardDiv = document.createElement('div');
        cardDiv.innerHTML = `<div class="card py-5 bg-base-100 shadow-xl">
    <figure><img class="h-[200px]  px-3 w-full" src="${card.thumbnail}" alt="Shoes" /></figure>
    <div class="absolute top-44 right-9 px-2 py-1 rounded-lg ${(card.others.posted_date) ? 'bg-black text-white' : ''}">${(card.others.posted_date) ? timeConvert(card.others.posted_date) : ''}</div>
    <div class="ml-3 mt-4">
        <div class="flex gap-3">
            <div>
                <img class="w-10 h-10 rounded-full" src="${card.authors[0].profile_picture}" alt="">
            </div>
            <div class="space-y-2">
                <h3 class="font-bold">${card.title}</h3>
                <div class="flex items-center gap-3">
                <h5 class="text-[#111111B3]">${card.authors[0].profile_name}</h5>
                <div class="${(card.authors[0].verified==true)?'flex':'hidden'}">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                <g clip-path="url(#clip0_11_34)">
                  <path d="M19.375 10.0001C19.375 10.8001 18.3922 11.4595 18.1953 12.197C17.9922 12.9595 18.5063 14.022 18.1203 14.6892C17.7281 15.3673 16.5484 15.4486 15.9984 15.9986C15.4484 16.5486 15.3672 17.7282 14.6891 18.1204C14.0219 18.5064 12.9594 17.9923 12.1969 18.1954C11.4594 18.3923 10.8 19.3751 10 19.3751C9.2 19.3751 8.54062 18.3923 7.80312 18.1954C7.04062 17.9923 5.97813 18.5064 5.31094 18.1204C4.63281 17.7282 4.55156 16.5486 4.00156 15.9986C3.45156 15.4486 2.27187 15.3673 1.87969 14.6892C1.49375 14.022 2.00781 12.9595 1.80469 12.197C1.60781 11.4595 0.625 10.8001 0.625 10.0001C0.625 9.20012 1.60781 8.54075 1.80469 7.80325C2.00781 7.04075 1.49375 5.97825 1.87969 5.31106C2.27187 4.63293 3.45156 4.55168 4.00156 4.00168C4.55156 3.45168 4.63281 2.272 5.31094 1.87981C5.97813 1.49387 7.04062 2.00793 7.80312 1.80481C8.54062 1.60793 9.2 0.625122 10 0.625122C10.8 0.625122 11.4594 1.60793 12.1969 1.80481C12.9594 2.00793 14.0219 1.49387 14.6891 1.87981C15.3672 2.272 15.4484 3.45168 15.9984 4.00168C16.5484 4.55168 17.7281 4.63293 18.1203 5.31106C18.5063 5.97825 17.9922 7.04075 18.1953 7.80325C18.3922 8.54075 19.375 9.20012 19.375 10.0001Z" fill="#2568EF"/>
                  <path d="M12.7094 7.20637L9.14062 10.7751L7.29062 8.92668C6.88906 8.52512 6.2375 8.52512 5.83594 8.92668C5.43437 9.32824 5.43437 9.97981 5.83594 10.3814L8.43125 12.9767C8.82187 13.3673 9.45625 13.3673 9.84687 12.9767L14.1625 8.66106C14.5641 8.25949 14.5641 7.60793 14.1625 7.20637C13.7609 6.80481 13.1109 6.80481 12.7094 7.20637Z" fill="#FFFCEE"/>
                </g>
                <defs>
                  <clipPath id="clip0_11_34">
                    <rect width="20" height="20" fill="white"/>
                  </clipPath>
                </defs>
              </svg>
                </div>
                </div>
                <p class="text-[#111111B3]">${card.others.views} views</p>
            </div>
        </div>
    </div>
  </div>`
        cardSection.appendChild(cardDiv);
    });
}

// handle selected category
const loadCategory = (category_id) => {
    document.getElementById('cards-section').innerHTML = '';
    document.getElementById('void-section').innerHTML = '';
    loadCards(category_id);
    livePageCatId=category_id;
    modifyTabStyles(category_id);
}


// Accessing tabs and modifying their styles 
const modifyTabStyles = async (category_id) => {
    const res = await fetch('https://openapi.programming-hero.com/api/videos/categories');
    const data = await res.json();
    const temp = data.data;
    temp.forEach(catIndex => {
        const tabElement = document.getElementById(`tab-${catIndex.category_id}`);
        if (tabElement) {
            if (catIndex.category_id === category_id) {
                tabElement.style.backgroundColor = '#FF1F3D';
                tabElement.style.color = 'white';
            } else {
                tabElement.style.backgroundColor = '#25252521';
                tabElement.style.color = 'black';
            }
        }
    });
}

// time conversion function
function timeConvert(temp) {
    const hr = Math.floor(temp / 3600);
    const min = Math.floor((temp % 3600) / 60);
    return parseInt(hr) + "hrs " + min + " min ago";
}

// handle cards sort by views
const handleSortByView = async() =>{
    const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${livePageCatId}`);
    const data = await res.json();
    const temp = data.data;
     temp.sort((p1,p2)=>(parseFloat(p1.others.views)<parseFloat(p2.others.views))?1:(parseFloat(p1.others.views)>parseFloat(p2.others.views))?-1:0);
     handleDisplayCard(temp);
}


