package com.edu.lostandfound.po;

import javax.persistence.*;

@Entity
@Table(name = "area")
public class Area {
    /**
     * id
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "areaId")
    private Integer areaId;

    /**
     * 地区名称
     */
    private String areaName;

    /**
     * 所属校区
     */
    private String areaRemarks;

    /**
     * 区域类型
     */
    private String areaType;

    /**
     * 状态
     */
    private String state;

    /**
     * 
     * @return area_id 
     */
    public Integer getAreaId() {
        return areaId;
    }

    /**
     * 
     * @param areaId 
     */
    public void setAreaId(Integer areaId) {
        this.areaId = areaId;
    }

    /**
     * 地区名称
     * @return area_name 地区名称
     */
    public String getAreaName() {
        return areaName;
    }

    /**
     * 地区名称
     * @param areaName 地区名称
     */
    public void setAreaName(String areaName) {
        this.areaName = areaName == null ? null : areaName.trim();
    }

    /**
     * 所属校区
     * @return area_remarks 所属校区
     */
    public String getAreaRemarks() {
        return areaRemarks;
    }

    /**
     * 所属校区
     * @param areaRemarks 所属校区
     */
    public void setAreaRemarks(String areaRemarks) {
        this.areaRemarks = areaRemarks == null ? null : areaRemarks.trim();
    }

    /**
     * 区域类型
     * @return area_type 区域类型
     */
    public String getAreaType() {
        return areaType;
    }

    /**
     * 区域类型
     * @param areaType 区域类型
     */
    public void setAreaType(String areaType) {
        this.areaType = areaType == null ? null : areaType.trim();
    }

    /**
     * 
     * @return state 
     */
    public String getState() {
        return state;
    }

    /**
     * 
     * @param state 
     */
    public void setState(String state) {
        this.state = state == null ? null : state.trim();
    }
}