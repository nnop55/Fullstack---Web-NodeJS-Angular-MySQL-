import { Request, Response } from 'express';


class ServerSidePaging {
    public async paging(req: Request, res: Response, result: any[]): Promise<void> {
        const { page = 1, pageSize = 10, sortBy = 'id', sortOrder = 'asc' } = req.query;

        if (sortBy) {
            result.sort((a: any, b: any) => {
                let comparison = 0;
                if (typeof a[sortBy as string] === 'string' && typeof b[sortBy as string] === 'string') {
                    comparison = a[sortBy as string].localeCompare(b[sortBy as string]);
                } else {
                    comparison = a[sortBy as string] - b[sortBy as string];
                }
                return sortOrder === 'asc' ? comparison : -comparison;
            });
        }

        const totalCount = result.length;
        const totalPages = Math.ceil(totalCount / Number(pageSize));

        const startIndex = (Number(page) - 1) * Number(pageSize);
        const endIndex = startIndex + Number(pageSize);
        const paginatedData = result.slice(startIndex, endIndex);

        res.status(200).json({ code: 1, data: { paginatedData, paginator: { totalCount, totalPages } } });
    }
}

export default new ServerSidePaging()