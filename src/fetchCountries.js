export function fetchCountries(name) {
    const params = {
        nameCountries: name,
        };

      if(name !== "") {
        return fetch(`https://restcountries.com/v3.1/name/${params.nameCountries.trim()}`)
        .then(res => {
        
            if(!res.ok) {
                throw new Error(res.status)
            }
            return res.json()
            })
        } 
        }