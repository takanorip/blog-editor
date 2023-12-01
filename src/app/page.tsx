"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import styles from "./page.module.css";
import { useEffect } from "react";
import { getRepoData } from "./_lib/getRepoData";

export default function Home() {
  const { data: session, status } = useSession();
  const loading = status === "loading";

  useEffect(() => {
    (async () => {
      if (!session?.user.accessToken) return;
      const file = await getRepoData(session.user.accessToken);
      console.log(file);
    })();
  }, [session?.user.accessToken]);

  return (
    <main className={styles.main}>
      {!session && (
        <>
          {loading ? (
            <>Loading ...</>
          ) : (
            <>
              Not signed in <br />
              <button onClick={() => signIn()}>Sign in</button>
            </>
          )}
        </>
      )}
      {session && (
        <>
          name:{session?.user?.name} <br />
          <br />
          <button onClick={() => signOut()}>Sign out</button>
        </>
      )}
    </main>
  );
}
