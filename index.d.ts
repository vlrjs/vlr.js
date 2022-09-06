enum Path {
    Match = `${!(isNaN(parseInt(string)))}` | `${!(isNaN(parseInt(string)))}/${string}`
}

interface Match {
}

MatchValidator = (path: string) => {
    if (path.includes('/')) {
        path = path.split('/');
        const id = path[0];
        if (isNaN(parseInt(id))) throw Error('Invalid Match ID');
        continue;
    } else {
        const id = path;
        if (isNaN(parseInt(id))) throw Error('Invalid Match ID');
        continue;
    }
}

class VLR {
    async getMatch(path: Path.Match): Promise<Match>;
}

export default VLR;
module.exports = VLR;