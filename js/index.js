document.addEventListener("DOMContentLoaded",()=>{
    const searchForm = document.getElementById("github-form")
    //const gitContainer = document.getElementById('github-container')
    const userList = document.getElementById('user-list')
    const reposList = document.getElementById('repos-list')


    searchForm.addEventListener("submit", (e) =>{
        e.preventDefault()
        userList.innerHTML=""
        reposList.innerHTML = ""
        const inputValue = document.getElementById("search").value

        fetch(`https://api.github.com/search/users?q=${inputValue}`,{
            headers: {
                "Accept": "application/vnd.github.v3+json"
            }
        })
        .then(resp => resp.json())
        .then(data => {
            data.items.forEach(user =>{
                
                const avatarItem = document.createElement("img")
                const userItem = document.createElement("p")
                const profileLink = document.createElement("a")

                userItem.textContent = user.login
                avatarItem.src = user.avatar_url
                profileLink.textContent = user.url

                userList.appendChild(userItem)
                userList.appendChild(avatarItem)
                userList.appendChild(profileLink)

                avatarItem.addEventListener("click",()=>{
                    userList.innerHTML = ""

                    userList.appendChild(userItem)
                    userList.appendChild(avatarItem)
                    userList.appendChild(profileLink)
                    fetch(`https://api.github.com/users/${user.login}/repos`,{
                        headers: {
                            "Accept": "application/vnd.github.v3+json"
                        }
                    })
                    .then(response => response.json())
                    .then(data => {
                        data.forEach(repo =>{
                            const repoItem = document.createElement("li")
                            const secondRepoItem = document.createElement("p")
                            const spaceBreak = document.createElement("br")
                            const repoURL = document.createElement("p")
                            const repoDesc = document.createElement("p")

                            if(repo.full_name){
                                repoItem.textContent = repo.full_name
                            }

                            if(repoItem !== ""){
                                reposList.appendChild(repoItem)
                            }
                            if(repo.owner.html_url){
                                secondRepoItem.textContent =repo.owner.html_url
                                repoURL.textContent = repo.owner.url
                                repoDesc.textContent = repo.description 
                            }
                            if(secondRepoItem !== "")
                            {
                                 
                                reposList.appendChild(secondRepoItem)
                                reposList.appendChild(repoURL)
                                reposList.appendChild(repoDesc)
                                reposList.appendChild(spaceBreak)
                            }
                            
                        })
                    })

                })
               
            })
            
        })
    })
})