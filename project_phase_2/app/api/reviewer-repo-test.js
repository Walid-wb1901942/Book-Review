import { getReviewsByReviewerId,getPapersToReview } from "./reviewer/reviewer_repo.js";

console.log(await getReviewsByReviewerId(3));
console.log(await getPapersToReview(3));