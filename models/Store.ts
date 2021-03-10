import {types, flow} from 'mobx-state-tree';
import {create} from 'apisauce';
interface photo{
    server: string;
    id: string;
    secret:string;
}

const api:any= create({
    baseURL: `https://api.flickr.com/services`
})

const Photo = types.model("Photo",{
    server_id: types.optional(types.string,""),
    id: types.optional(types.string,""),
    secret: types.optional(types.string,"")
})

const Photos = types.model("Photos",{
    photos: types.optional(types.array(Photo),[])
}).actions(self => {
    const reset = () =>{
        self.photos.length = 0;
    }
    const save=flow(function* save(query: string)
    {
        const response = yield api.get(`/rest/?method=flickr.photos.search&api_key=b8da685d69c3fab2c02fe9612e2d41dd&tags=${query}&per_page=3&format=json&nojsoncallback=1`);
        if(response.ok && response.data.photos)
        {
            self.photos.length= 0;
            response.data.photos.photo.forEach(({id,server,secret}:photo) => self.photos.push({server_id: server, id: id, secret: secret}))
        }
    });
    return {reset,save}
}).views(self =>({
    get tot(){
        return self.photos.length
    }
}))

export {Photos}

