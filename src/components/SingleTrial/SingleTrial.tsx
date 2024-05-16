"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext, FavoritedTrialsContext } from "../Layout/Layout";

const SingleTrial: React.FC = () => {
  const { currentUser } = useContext(AuthContext);
  if (!currentUser) return;

  const { favorites, setFavorites } = useContext(FavoritedTrialsContext);
  const [data, setData] = useState<any>();

  const params = useParams();
  const trialId = params["trialId"];

  const fetchData = async () => {
    const result = await axios(
      "https://clinicaltrials.gov/api/v2/studies/" + trialId
    );
    setData(result.data);
  };

  useEffect(() => {
    console.log("favorites", favorites);
    if (!data) fetchData();
  }, [data]);

  useEffect(() => {
    console.log(favorites);
  }, [favorites]);

  const idFoundInFavorites = favorites.find(
    (favorite: any) => favorite === trialId
  );

  return (
    <div>
      <Link href="/">
        <button>Go Back</button>
      </Link>

      <p>{data?.protocolSection.descriptionModule.briefSummary}</p>
      <p>{data?.protocolSection.descriptionModule.detailedDescription}</p>

      <button
        onClick={() => {
          if (!idFoundInFavorites) {
            setFavorites((favorites: any) => [...favorites, trialId]);
          } else {
            setFavorites((favorites: any) =>
              favorites.filter((favorite: any) => favorite !== trialId)
            );
          }
        }}
      >
        {!idFoundInFavorites ? "Favorite" : "Unfavorite"}
      </button>
    </div>
  );
};

export default SingleTrial;
