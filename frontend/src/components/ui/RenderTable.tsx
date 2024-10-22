import { Table, TableBody, TableCaption, TableHead, TableHeader, TableRow } from "./table";

interface RenderTableProps {
    children: React.ReactNode
}

export const RenderTable = ({ children }: RenderTableProps) => {
    return (
        <div>
            <Table>
                <TableCaption>A list of your recent posts.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="text-center">ID</TableHead>
                        <TableHead className="text-center">Title</TableHead>
                        <TableHead className="text-center">Description</TableHead>
                        <TableHead className="text-center">Status</TableHead>
                        <TableHead className="text-center">InitTimestamp</TableHead>
                        <TableHead className="text-center">FinalTimestamp</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {children}
                </TableBody>
            </Table>
        </div>
    );
}