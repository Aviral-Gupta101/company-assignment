import { LoaderCircle } from "lucide-react";
import { TableRow, TableCell } from "./table";
import React from "react";

type RenderTableRowProps = {
    isLoading: boolean,
    id?: string,
    title?: string,
    description?: string,
    status?: string,
    initTimestamp?: number,
    finalTimestamp?: number,

}

export const RenderTableRow = React.memo(({ isLoading, id, title, description, status, initTimestamp, finalTimestamp }: RenderTableRowProps) => {

    if (isLoading) {
        return (
            <TableRow>
                <TableCell className="text-center">
                    <div className="flex justify-center">
                        <LoaderCircle className=" animate-spin" />
                    </div>
                </TableCell>
                <TableCell className="text-center">
                    <div className="flex justify-center">
                        <LoaderCircle className=" animate-spin" />
                    </div>
                </TableCell>
                <TableCell className="text-center">
                    <div className="flex justify-center">
                        <LoaderCircle className=" animate-spin" />
                    </div>
                </TableCell>
                <TableCell className="text-center">
                    <div className="flex justify-center">
                        <LoaderCircle className=" animate-spin" />
                    </div>
                </TableCell>
                <TableCell className="text-center">
                    <div className="flex justify-center">
                        <LoaderCircle className=" animate-spin" />
                    </div>
                </TableCell>
                <TableCell className="text-center">
                    <div className="flex justify-center">
                        <LoaderCircle className=" animate-spin" />
                    </div>
                </TableCell>
            </TableRow>
        );
    }

    return (
        <TableRow>
            <TableCell className="text-center">
                {id}
            </TableCell>
            <TableCell className="text-center">
                {title}
            </TableCell>
            <TableCell className="text-center">
                {description}
            </TableCell>
            <TableCell className="text-center capitalize">
                {status}
            </TableCell>
            <TableCell className="text-center">
                {initTimestamp}
            </TableCell>
            <TableCell className="text-center">
                {finalTimestamp ? finalTimestamp :
                    <div className="flex justify-center">
                        <LoaderCircle className=" animate-spin" />
                    </div>}
            </TableCell>
        </TableRow>
    );

});
