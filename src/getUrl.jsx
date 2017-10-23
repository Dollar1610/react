export default function getUrl(_url, data) {
    if (!data) {
        return _url;
    } else {
        let url = _url;
        Object.keys(data).forEach((key) => {
            url += `${key}=${encodeURIComponent(data[key])}`;
        });
        return url;
    }
}
