/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateLocation = /* GraphQL */ `
  subscription OnCreateLocation {
    onCreateLocation {
      id
      name
      posts {
        items {
          id
          url
          name
          createdAt
          updatedAt
          locationPostsId
        }
        nextToken
      }
      difficulty
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateLocation = /* GraphQL */ `
  subscription OnUpdateLocation {
    onUpdateLocation {
      id
      name
      posts {
        items {
          id
          url
          name
          createdAt
          updatedAt
          locationPostsId
        }
        nextToken
      }
      difficulty
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteLocation = /* GraphQL */ `
  subscription OnDeleteLocation {
    onDeleteLocation {
      id
      name
      posts {
        items {
          id
          url
          name
          createdAt
          updatedAt
          locationPostsId
        }
        nextToken
      }
      difficulty
      createdAt
      updatedAt
    }
  }
`;
export const onCreateImage = /* GraphQL */ `
  subscription OnCreateImage {
    onCreateImage {
      id
      url
      name
      createdAt
      updatedAt
      locationPostsId
    }
  }
`;
export const onUpdateImage = /* GraphQL */ `
  subscription OnUpdateImage {
    onUpdateImage {
      id
      url
      name
      createdAt
      updatedAt
      locationPostsId
    }
  }
`;
export const onDeleteImage = /* GraphQL */ `
  subscription OnDeleteImage {
    onDeleteImage {
      id
      url
      name
      createdAt
      updatedAt
      locationPostsId
    }
  }
`;
