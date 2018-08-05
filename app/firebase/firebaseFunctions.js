export function snapshotToArray(snapshot, uid) {
    var returnArr = [];

    snapshot.forEach(function(childSnapshot) {
        let item = childSnapshot.val();
        item.key = childSnapshot.key;

        const likes = Object.keys(item.likes ? item.likes : {});
        if(likes.includes(uid)){
          item.isLiked = true
        }
        else{
          item.isLiked = false
        }

        returnArr.push(item);
    });

    return returnArr.reverse(); //sort post by date desc
};
