package com.edu.lostandfound.utils;
import java.util.List;
public class PageData<T> {   
	private long total;    // 总条数
	private Integer page;     // 当前页
	private Integer size;     // 每页数
	private Integer pageIndex; //每页起始行数
	private T paramObj; //请求参数
	private List<T> rows; // 结果集

	public T getParamObj() {
		return paramObj;
	}

	public void setParamObj(T paramObj) {
		this.paramObj = paramObj;
	}

	public Integer getPageIndex() {
		return pageIndex;
	}

	public void setPageIndex(Integer pageIndex) {
		this.pageIndex = pageIndex;
	}

	public long getTotal() {
		return total;
	}

	public void setTotal(long total) {
		this.total = total;
	}

	public Integer getPage() {
		return page;
	}
	public void setPage(Integer page) {
		this.page = page;
	}
	public Integer getSize() {
		return size;
	}
	public void setSize(Integer size) {
		this.size = size;
	}
	public List<T> getRows() {
		return rows;
	}
	public void setRows(List<T> rows) {
		this.rows = rows;
	}  
}
