let SiteNameInput = document.getElementById("siteName");
let SiteURLInput = document.getElementById("siteURL");
let bookmakers = [];

if(localStorage.getItem("bookmakers") !== null){
    bookmakers = JSON.parse(localStorage.getItem("bookmakers"));
    displayBookmakers(bookmakers);
}

document.getElementById("bookmarkForm").addEventListener("submit", function(e){
    e.preventDefault(); // يمنع الفورم من إعادة التحميل
    addBook();
});

function addBook() {
    let siteName = SiteNameInput.value.trim();
    let siteURL = SiteURLInput.value.trim();

    // Validation
    if(siteName === '' || siteURL === ''){
        alert('Please fill in both fields');
        return;
    }

    let pattern = /^(https?:\/\/)?([\w-]+\.)+[\w-]{2,6}(\/[\w-]*)*\/?$/;
    if(!pattern.test(siteURL)){
        alert('Please enter a valid URL');
        return;
    }

    let bookmaker = { siteName, siteURL };
    bookmakers.push(bookmaker);
    displayBookmakers(bookmakers);

    SiteNameInput.value = '';
    SiteURLInput.value = '';
}

function displayBookmakers(bookmakers) {
    let cartona = '';
    for(let i = 0; i < bookmakers.length; i++){
        cartona += `
            <tr>
                <td>${i + 1}</td>
                <td>${bookmakers[i].siteName}</td>
                <td>
                    <a href="${bookmakers[i].siteURL}" target="_blank" class="btn btn-success btn-sm">
                        <i class="fa-solid fa-eye"></i> Visit
                    </a>
                </td>
                <td>
                    <button class="btn btn-danger" onclick="deleteBookmakers(${i})">
                        <i class="fa-solid fa-trash"></i> Delete
                    </button>
                </td>
            </tr>`;
    }
    document.getElementById("myBody").innerHTML = cartona;
    localStorage.setItem("bookmakers", JSON.stringify(bookmakers));
}

function deleteBookmakers(index){
    bookmakers.splice(index, 1);
    displayBookmakers(bookmakers);
}
