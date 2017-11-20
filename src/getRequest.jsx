export default function getRequest (url) {
    let responseData = [];
    fetch(url)
        .then((response) => {
            response.json()
                .then((data) => {
                for (let i=0;i<data.length;i++)
                    responseData.push(data[i])
                    console.log(responseData);
                return responseData
                });

        })
}