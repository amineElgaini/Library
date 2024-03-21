import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Link } from "react-router-dom";

function BookCard({ book }) {
    return (
        <Link to={`/books/${book.id}`}>
            <Card className="w-[300px]">
                <img
                    className="rounded w-full h-[150px] object-none"
                    src={`https://picsum.photos/300?random=${book.id}`}
                    alt=""
                />
                <CardHeader>
                    <CardTitle>{book.title}</CardTitle>
                </CardHeader>
                <CardContent>
                    <CardDescription>{book.additionalDetails}</CardDescription>
                </CardContent>
            </Card>
        </Link>
    );
}

export default BookCard;
