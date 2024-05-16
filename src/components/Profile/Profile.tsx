"use client";
import styles from "./Profile.module.scss";
import { useEffect, useState, useContext } from "react";
import { AuthContext, FavoritedTrialsContext } from "../Layout/Layout";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";

const Profile: React.FC = () => {
  const { currentUser, setCurrentUser } = useContext(AuthContext);
  if (!currentUser) return;

  const router = useRouter();
  const { favorites } = useContext(FavoritedTrialsContext);
  const [favoriteList, setFavoriteList] = useState<any>([]);

  const fetchData = () => {
    favorites.map(async (favoriteId: string) => {
      const result = await axios(
        "https://clinicaltrials.gov/api/v2/studies/" + favoriteId
      );

      setFavoriteList((favoriteList: any) => [...favoriteList, result.data]);
    });
  };

  useEffect(() => {
    if (favorites.length > 0) fetchData();
  }, [favorites]);

  return (
    <div>
      <button
        onClick={() => {
          setCurrentUser(null);
          router.push("/");
        }}
      >
        Log out
      </button>

      {favorites.length === 0 ? (
        <h2>No Favorites added</h2>
      ) : (
        <>
          <h2>Favorites</h2>

          <div className={styles.Trials}>
            {favoriteList?.map((favorite: any, index: number) => (
              <Link
                key={index}
                href={
                  "singletrial/" +
                  favorite.protocolSection.identificationModule.nctId
                }
              >
                <div className={styles.Trial}>
                  <p>
                    {favorite.protocolSection.descriptionModule.briefSummary}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Profile;
