import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTopUsers } from "@/hooks/reactQuery/useStatistics";

function TopActiveUsers() {
  const { data: topUsers, isLoading: topUsersIsLoading } = useTopUsers();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Active Users</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-8">
        {!topUsersIsLoading &&
          topUsers?.data.map((user) => (
            <div key={user.id} className="flex items-center gap-4">
              <Avatar className="hidden h-9 w-9 sm:flex">
                <AvatarImage src="/avatars/01.png" alt="Avatar" />
                <AvatarFallback>
                  {user.username.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="grid gap-1">
                <p className="text-sm font-medium leading-none">
                  {user.username}
                </p>
                <p className="text-sm text-muted-foreground">{user.email}</p>
              </div>
              <div className="ml-auto font-medium flex gap-2 items-center">
                {user.borrowedTimes}
                <img className="h-[23px]" src="./borrowBook.png" alt="" />
              </div>
            </div>
          ))}
      </CardContent>
    </Card>
  );
}

export default TopActiveUsers;
