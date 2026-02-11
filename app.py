import streamlit as st
import pandas as pd

st.title("Amazon Review Sentiment Dashboard")

# load dataset
df = pd.read_csv("dataset.csv")

st.write("Dataset Preview")
st.dataframe(df.head())

st.write("Rating Distribution")
st.bar_chart(df["rating"].value_counts())