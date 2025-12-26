// loading left navigation all categories
const loadCategories=()=>{
    fetch('https://openapi.programming-hero.com/api/categories')
    .then(res=>res.json())
    .then(json=>displayCategories(json.categories))
}


// maintaining button activeness
const removeActive=()=>{
    const categoryButtons=document.querySelectorAll('.category-btn')
    categoryButtons.forEach(btn=>btn.classList.remove('active'))
}


// managing spinner 
const manageSpinner=(status)=>{
    if(status==true){
        document.getElementById('spinner').classList.remove('hidden')
        document.getElementById('tree-cards').classList.add('hidden')
    }else{
        document.getElementById('tree-cards').classList.remove('hidden')
        document.getElementById('spinner').classList.add('hidden')
    }
}


let allTrees=[];
// loading all trees after opening or landing the page
const loadAllTrees=()=>{
    manageSpinner(true)

    fetch('https://openapi.programming-hero.com/api/plants')
    .then(res=>res.json())
    .then(json=>{
        allTrees=json.plants;
        displayAllTrees(allTrees)
        
    })
}


// loading category after clicking one specific category from the left navigation 
const loadCategoryTrees=(id)=>{
    manageSpinner(true)

    const url=`https://openapi.programming-hero.com/api/category/${id}`
    fetch(url)
    .then(res=>res.json())
    .then(data=>{
        removeActive()
        const clickBtn=document.getElementById(`category-btn-${id}`)
        clickBtn.classList.add('active')
        displayCategoryTrees(data.plants)
    })
    
}


// loading tree detail for modal
const loadTreeDetail=(id)=>{
    const url=`https://openapi.programming-hero.com/api/plant/${id}`;
    fetch(url)
    .then(res=>res.json())
    .then(details=>displayTreeDetails(details.plants))
}


// displaying all categories on the left navigation
const displayCategories=(categories)=>{
    const categoriesContainer=document.getElementById('categories-container')
    categoriesContainer.innerHTML='';
    for(let category of categories){
        const btnDiv=document.createElement('div');
        btnDiv.innerHTML=`
            <button id=category-btn-${category.id} onclick="loadCategoryTrees(${category.id})" class="category-btn w-[200px] h-[35px] rounded-sm pl-2 text-left mb-2 text-black hover:bg-[#15803D] hover:text-white">${category.category_name}</button>
        `
        categoriesContainer.append(btnDiv)
    }
}


// displaying all trees
const displayAllTrees=(allTrees)=>{
    const allTreesContainer=document.getElementById('tree-cards')
    allTreesContainer.innerHTML='';
    for(let allTree of allTrees){
        const cardDiv=document.createElement('div');
        cardDiv.innerHTML=`
                <div class="w-[280px] h-[420px] bg-white rounded-sm shadow-lg">
                    <div class="p-4">
                        <div class="rounded-sm overflow-hidden">
                            <img src="${allTree.image}" class="w-full h-[185px] object-cover" alt="">
                        </div>
                    </div>
                    <h6 onclick="loadTreeDetail(${allTree.id})" class="text-[14px] font-semibold px-4 mb-2">${allTree.name}</h6>
                    <p class="text-[#1F2937] text-[12px] px-4 mb-3">${allTree.description}</p>
                    <div class="flex justify-between px-4 mb-3">
                        <div class="bg-[#DCFCE7] text-[#15803D] w-[120px] h-[28px] text-[14px] flex justify-center items-center rounded-xl">${allTree.category}</div>
                        <p class="text-[14px] font-semibold"><i class="fa-solid fa-bangladeshi-taka-sign"></i>${allTree.price}</p>
                    </div>
                    <div class="px-4">
                        <button onclick="displayAddToCart('${allTree.name}',${allTree.price})" class="bg-[#15803D] w-full h-[35px] text-center text-white rounded-2xl">Add to Cart</button>
                    </div>
                </div>
        `
        allTreesContainer.append(cardDiv)
    }
    manageSpinner(false)
}


// displaying all trees after clicking All Trees button
const displayAllTreesAfterClicking=(allTrees)=>{
    removeActive()
    manageSpinner(true)
    const clickBtn=document.getElementById(`category-all-trees`)
    clickBtn.classList.add('active')
    // console.log(allTrees)
    const allTreesContainer=document.getElementById('tree-cards')
    allTreesContainer.innerHTML='';
    for(let allTree of allTrees){
        const cardDiv=document.createElement('div');
        cardDiv.innerHTML=`
                <div class="w-[280px] h-[420px] bg-white rounded-sm shadow-lg">
                    <div class="p-4">
                        <div class="rounded-sm overflow-hidden">
                            <img src="${allTree.image}" class="w-full h-[185px] object-cover" alt="">
                        </div>
                    </div>
                    <h6 onclick="loadTreeDetail(${allTree.id})" class="text-[14px] font-semibold px-4 mb-2">${allTree.name}</h6>
                    <p class="text-[#1F2937] text-[12px] px-4 mb-3">${allTree.description}</p>
                    <div class="flex justify-between px-4 mb-3">
                        <div class="bg-[#DCFCE7] text-[#15803D] w-[120px] h-[28px] text-[14px] flex justify-center items-center rounded-xl">${allTree.category}</div>
                        <p class="text-[14px] font-semibold"><i class="fa-solid fa-bangladeshi-taka-sign"></i>${allTree.price}</p>
                    </div>
                    <div class="px-4">
                        <button onclick="displayAddToCart('${allTree.name}',${allTree.price})" class="bg-[#15803D] w-full h-[35px] text-center text-white rounded-2xl">Add to Cart</button>
                    </div>
                </div>
        `
        allTreesContainer.append(cardDiv)
    }
    manageSpinner(false)
}


// displaying a category trees after clicking special category from the left navigation
const displayCategoryTrees=(categoryTrees)=>{
    const categoryTreesContainer=document.getElementById('tree-cards')
    categoryTreesContainer.innerHTML='';
    for(let categoryTree of categoryTrees){
        const cardDiv=document.createElement('div');
        cardDiv.innerHTML=`
                <div class="w-[280px] h-[420px] bg-white rounded-sm shadow-lg">
                    <div class="p-4">
                        <div class="rounded-sm overflow-hidden">
                            <img src="${categoryTree.image}" class="w-full h-[185px] object-cover" alt="">
                        </div>
                    </div>
                    <h6 onclick="loadTreeDetail(${categoryTree.id})" class="text-[14px] font-semibold px-4 mb-2">${categoryTree.name}</h6>
                    <p class="text-[#1F2937] text-[12px] px-4 mb-3">${categoryTree.description}</p>
                    <div class="flex justify-between px-4 mb-3">
                        <div class="bg-[#DCFCE7] text-[#15803D] w-[120px] h-[28px] text-[14px] flex justify-center items-center rounded-xl">${categoryTree.category}</div>
                        <p class="text-[14px] font-semibold"><i class="fa-solid fa-bangladeshi-taka-sign"></i>${categoryTree.price}</p>
                    </div>
                    <div class="px-4">
                        <button onclick="displayAddToCart('${categoryTree.name}',${categoryTree.price})" class="bg-[#15803D] w-full h-[35px] text-center text-white rounded-2xl">Add to Cart</button>
                    </div>
                </div>
        `
        categoryTreesContainer.append(cardDiv);
    }
    manageSpinner(false)
}


let total = 0;
// displaying add to cart
const displayAddToCart=(name,price)=>{
    const cartContainer=document.getElementById('cart-container')
    const cartDiv=document.createElement('div')
    cartDiv.innerHTML=`
        <div class="bg-[#f0fdf4] flex justify-between items-center rounded-sm p-2 m-2">
            <div>
                <h6 class="text-[14px] font-semibold">${name}</h6>
                <p class="text-[#1F2937] text-[14px]"><i class="fa-solid fa-bangladeshi-taka-sign"></i><span id="everyPrice">${price}</span></p>
            </div>
            <button onclick="removeCartItem(this, ${price})">
                <i class="fa-solid fa-xmark"></i>
            </button>
        </div>
        
    `
    cartContainer.append(cartDiv)
    total += parseInt(price);
    document.getElementById("totalPrice").innerText = total;

}

function removeCartItem(btn, price) {
  // remove the cart item (its parent container)
  btn.parentElement.parentElement.remove();     // Because the cross button (btn) is nested inside two wrapper elements. one cart div and one is card div(that is created)

  // decrease total
  total -= parseInt(price);
  document.getElementById("totalPrice").innerText = total;
}


// displaying modal for tree details
const displayTreeDetails=(treeDetail)=>{
    const detailContainer=document.getElementById('tree-details-container')
    detailContainer.innerHTML=`
        <h2 class="font-semibold text-2xl">${treeDetail.name}</h2>
        <div class="rounded-sm overflow-hidden">
            <img src="${treeDetail.image}" class="w-full h-[250px] object-cover" alt="">
        </div>
        <p><span class="font-semibold">Category: </span>${treeDetail.category}</p>
        <P><span class="font-semibold">Price: </span><i class="fa-solid fa-bangladeshi-taka-sign"></i>${treeDetail.price}</P>
        <p><span class="font-semibold">Description: </span>${treeDetail.description}</p>
    `
    document.getElementById('tree_modal').showModal()
}


// loading left category navigation
loadCategories()


// loading all trees after opening this page
loadAllTrees()

