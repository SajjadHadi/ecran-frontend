"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/layout";
import { ShowCard } from "@/components/shows";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useFavoriteLists, useFavoriteListItems, useCreateFavoriteList, useDeleteFavoriteList } from "@/features/favorites/hooks";
import { useSession } from "@/features/auth/hooks";
import type { FavoriteList, FavoriteItem } from "@/types";

function FavoritesContent() {
  const router = useRouter();
  const { data: session, isLoading: sessionLoading } = useSession();
  const { data: lists, isLoading } = useFavoriteLists();
  const [selectedListId, setSelectedListId] = useState<string | null>(null);
  const [newListName, setNewListName] = useState("");
  const [showCreateForm, setShowCreateForm] = useState(false);
  const createList = useCreateFavoriteList();
  const deleteList = useDeleteFavoriteList();

  const { data: selectedListItems } = useFavoriteListItems(selectedListId || "");

  useEffect(() => {
    if (!sessionLoading && !session) {
      router.replace("/auth/signin");
    }
  }, [session, sessionLoading, router]);

  const handleCreateList = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newListName.trim()) return;
    createList.mutate(
      { name: newListName },
      {
        onSuccess: (newList) => {
          setNewListName("");
          setShowCreateForm(false);
          setSelectedListId(newList.id);
        },
      }
    );
  };

  if (sessionLoading || isLoading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1 container mx-auto py-8 px-4">
          <p>Loading...</p>
        </main>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 container mx-auto py-8 px-4">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">My Favorites</h1>
          <Button onClick={() => setShowCreateForm(true)}>Create List</Button>
        </div>

        {showCreateForm && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-lg">Create New List</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleCreateList} className="flex gap-2">
                <Input
                  placeholder="List name"
                  value={newListName}
                  onChange={(e) => setNewListName(e.target.value)}
                  className="max-w-xs"
                />
                <Button type="submit" disabled={createList.isPending}>
                  {createList.isPending ? "Creating..." : "Create"}
                </Button>
                <Button type="button" variant="outline" onClick={() => setShowCreateForm(false)}>
                  Cancel
                </Button>
              </form>
            </CardContent>
          </Card>
        )}

        <div className="grid md:grid-cols-4 gap-6">
          <div className="space-y-2">
            <h2 className="text-lg font-semibold">Lists</h2>
            {lists?.length === 0 ? (
              <p className="text-sm text-muted-foreground">No lists yet.</p>
            ) : (
              lists?.map((list: FavoriteList) => (
                <button
                  key={list.id}
                  onClick={() => setSelectedListId(list.id)}
                  className={`w-full text-left p-3 rounded-lg transition-colors ${
                    selectedListId === list.id
                      ? "bg-primary text-primary-foreground"
                      : "bg-card hover:bg-muted"
                  }`}
                >
                  <p className="font-medium">{list.name}</p>
                  <p className="text-sm opacity-70">
                    {list._count?.items ?? 0} items
                  </p>
                </button>
              ))
            )}
          </div>

          <div className="md:col-span-3">
            {selectedListId ? (
              selectedListItems?.length ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {selectedListItems.map((item: FavoriteItem) => (
                    <ShowCard key={item.id} show={item.showData} />
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">This list is empty.</p>
              )
            ) : (
              <p className="text-muted-foreground">Select a list to view items.</p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default function FavoritesPage() {
  return (
    <Suspense fallback={<div className="flex flex-col min-h-screen"><Navbar /><main className="flex-1 container mx-auto py-8 px-4">Loading...</main></div>}>
      <FavoritesContent />
    </Suspense>
  );
}
