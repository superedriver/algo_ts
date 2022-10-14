export const binarySearch = (arr: number[], key: number) => {
    if(arr.length === 0) return -1;

    let bad = -1;
    let good = arr.length;

    while(good - bad > 1) {
        const m = Math.trunc((good + bad)/2)

        if(arr[m] >= key) {
            good = m;
        } else {
            bad = m;
        }
    }

    return arr[good] === key ? good : -1;
}

export const binarySearchFirstEntryInsertionPosition = (arr: number[], key: number) => {
    if(arr.length === 0) return 0;

    let bad = -1;
    let good = arr.length;

    while(good - bad > 1) {
        const m = Math.trunc((good + bad)/2)

        if(arr[m] >= key) {
            good = m;
        } else {
            bad = m;
        }
    }

    return good;
}

export const binarySearchLastEntry = (arr: number[], key: number) => {
    if(arr.length === 0) return -1;

    let bad = -1;
    let good = arr.length;

    while(good - bad > 1) {
        const m = Math.trunc((good + bad)/2)

        if(arr[m] > key) {
            good = m;
        } else {
            bad = m;
        }
    }

    return arr[bad] === key ? bad : -1;
}
