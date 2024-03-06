import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, firestore } from "../../../../firebase/clientApp";
import useCommunityData from "../../../../hooks/useCommunityData";
import usePosts from "../../../../hooks/usePosts";
import PostItem from "@/components/Posts/PostItem";
import PageContentLayout from "../../../../components/Layout/PageContent";
import PageContent from "../../../../components/Layout/PageContent";
import { doc, getDoc } from "firebase/firestore";
import { Post } from "@/atoms/postsAtom";
import About from "@/components/Community/About";
import Comments from "@/components/Posts/Comments/Comments";
import { User } from "firebase/auth";

const PostPage: React.FC = () => {
  const [user] = useAuthState(auth);
  const router = useRouter();
  const { communityStateValue } = useCommunityData();

  // Need to pass community data here to see if current post [pid] has been voted on
  const { postStateValue, setPostStateValue, onDeletePost, onVote } = usePosts();

  const fetchPost = async (postId: string) => {
    try {
      const postDocRef = doc(firestore, "posts", postId);
      const postDoc = await getDoc(postDocRef);

      setPostStateValue((prev) => ({
        ...prev,
        selectedPost: { id: postDoc.id, ...postDoc.data() } as Post,
      }));
    } catch (error: any) {
      console.log("fetchPost error", error.message);
    }
  };

  // Fetch post if not already in state
  useEffect(() => {
    const { pid } = router.query;

    if (pid && !postStateValue.selectedPost) {
      fetchPost(pid as string);
    }
  }, [router.query, postStateValue.selectedPost]);

  return (
    <div
      style={{
        backgroundImage: "url('/images/comm.png')", // Assuming your image is located in the public/images directory
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh", // Ensure the background covers the entire page height
      }}
    >
      <PageContentLayout>
        {/* Left Content */}
        <>
          {postStateValue.selectedPost && (
            <PostItem
              post={postStateValue.selectedPost}
              onVote={onVote}
              onDeletePost={onDeletePost}
              userVoteValue={
                postStateValue.postVotes.find(
                  (item) => item.postId === postStateValue.selectedPost!.id
                )?.voteValue
              }
              userIsCreator={user?.uid === postStateValue.selectedPost.creatorId}
            />
          )}
            <Comments
                  user={user as User}
                  selectedPost={postStateValue.selectedPost}
                  communityId={postStateValue.selectedPost?.communityId as string}
                />
        </>
        <>
          {communityStateValue.currentCommunity && (
            <About communityData={communityStateValue.currentCommunity} />
          )}
        </>
      </PageContentLayout>
    </div>
  );
};

export default PostPage;
