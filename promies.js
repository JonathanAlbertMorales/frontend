const list = []
list.push(fetch('https://potterapi-fedeperin.vercel.app/es/characters?search=Weasley')
    .then(res => res.json()))

    list.push(fetch('https://potterapi-fedeperin.vercel.app/es/characters?search=Potter').then(res => res.json()))
    

    Promise.all(list).then(values => {
        console.log(values)
    })